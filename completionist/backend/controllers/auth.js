require('dotenv').config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const hashPw = require('../helpers/hash_password');
const comparePws = require('../helpers/compare_passwords');
const { response_code, response_message } = require('../helpers/response_code');
const { checkEmailExists } = require('../helpers/check_existing_user');
const userSchema = require('../models/user');
const createUser = require('../helpers/create_user');
const { createSignedToken, createRefreshToken } = require('../helpers/create_tokens');
const cache = require('../cache');

const dynamoDB = new DynamoDBClient({ region: process.env.REGION });
const docClient = DynamoDBDocumentClient.from(dynamoDB);

var params = {
	TableName: process.env.AWS_TABLE_NAME
};

// Calculate TTL for 60 days in seconds
const ttlInSeconds = 60 * 24 * 60 * 60;

const checkUserExists = async (req, res) => {
	const { email } = req.body;
	// Checks if user exists and whether they have a regular or google account set up
	const existingUser = await checkEmailExists(dynamoDB, email);
	console.log("checkUserExists");
	if (existingUser) {
		return res.status(response_code.SUCCESS)
			.json({
				regular: existingUser ? !!existingUser.pw : false,
				google: existingUser ? !!existingUser.googleId : false,
			});
	}
	else {
		return res.status(response_code.SUCCESS).json({
			regular: false,
			google: false
		});
	}
};

const signup = async (req, res) => {
	console.log("signup")
	const {
		userId,
		username,
		email,
		pw: userPw,
		googleId: userGoogleId,
	} = req.body;
	const existingUser = await checkEmailExists(docClient, email);
	if (existingUser) {
		return res.status(response_code.EMAIL_TAKEN).json({
			error: response_message.EMAIL_TAKEN
		});
	}

	// Hash password if password is provided & same for googleId
	let hashedPw = '';
	if (userPw) {
		hashedPw = await hashPw(userPw)
	}
	let hashedGoogleId = '';
	if (userGoogleId) {
		hashedGoogleId = await hashPw(userGoogleId)
	}

	let user = {
		userId,
		username,
		email,
		pw: hashedPw,
		googleId: hashedGoogleId
	}
	const updatedUser = createUser(user);
	const { err, value: validatedUser } = userSchema.validate(updatedUser);
	if (err) {
		console.log("Signup User Validation Error: ", err)
		return res.status(err.status).json(err.message);
	}
	params = {
		...params,
		Item: validatedUser
	};

	try {
		await dynamoDB.send(new PutCommand(params))
		const token = createSignedToken();
		const refreshToken = createRefreshToken()
		cache.set(process.env.REFRESH_TOKEN_CACHE_KEY, refreshToken, ttlInSeconds);

		const { pw, googleId, ...rest } = validatedUser;

		console.log("Signup Success");
		return res.json({
			token,
			refreshTokenExpiry: ttlInSeconds,
			user: rest,
		});
	}
	catch (err) {
		console.log("Signup Error: ", err);
		return res.status(err.status).json(err.message);
	}
};

const signin = async (req, res) => {
	console.log("signin")
	try {
		const { email, pw, googleId } = req.body;
		const existingUser = await checkEmailExists(docClient, email);
		if (!existingUser) {
			return res.status(response_code.NO_USER_FOUND).json({ error: "No user found." });
		}

		// Compare passwords or google ids
		if (existingUser.pw && pw) {
			const match = await comparePws(pw, existingUser.pw);
			if (!match) {
				return res.status(response_code.WRONG_PASSWORD).json({
					error: response_message.WRONG_PASSWORD,
				});
			}
		}
		else if (existingUser.googleId && googleId) {
			const match = await comparePws(googleId, existingUser.googleId);
			if (!match) {
				return res.status(response_code.WRONG_PASSWORD).json({
					error: response_message.WRONG_GOOGLE_ID
				});
			}
		}

		// Create signed & refresh tokens
		const token = createSignedToken();
		const refreshToken = createRefreshToken()
		cache.set(process.env.REFRESH_TOKEN_CACHE_KEY, refreshToken, ttlInSeconds);
		
		existingUser.pw = undefined;
		existingUser.googleId = undefined;
		existingUser.secret = undefined;

		// Response with token and user data
		return res.status(response_code.SUCCESS).json({
			token,
			refreshTokenExpiry: ttlInSeconds,
			user: existingUser
		});
	} catch (err) {
		return res.status(err.status).json(err.message);
	}
};

const linkAndSignIn = async (req, res) => {
	const { email, pw, googleId } = req.body;
	const existingUser = await checkEmailExists(docClient, email);
	if (!existingUser) {
		return res.status(response_code.NO_USER_FOUND).json({ error: response_message.NO_USER_FOUND });
	}

	// If user does not have googleId, update googleId
	let hashedGoogleId;
	if (!existingUser.googleId && googleId) {
		hashedGoogleId = await hashPw(googleId)
	}
	// TODO: If user does not have password, update password
	let hashedPw;
	if (!existingUser.pw && pw) {
		hashedPw = await hashPw(pw)
	}

	params = {
		...params,
		Key: {
			userId: existingUser.userId
		},
		UpdateExpression: pw ? "set pw = :pw" : "set googleId = :googleId",
		ExpressionAttributeValues: pw ? {
			":pw": hashedPw
		} : {
			":googleId": hashedGoogleId
		}
	};

	try {
		await dynamoDB.send(new UpdateCommand(params));
		const token = createSignedToken();
		const refreshToken = createRefreshToken();
		cache.set(process.env.REFRESH_TOKEN_CACHE_KEY, refreshToken, ttlInSeconds);

		const { pw, googleId, ...rest } = existingUser;

		console.log("User successfully linked");
		return res.json({
			token,
			refreshTokenExpiry: ttlInSeconds,
			user: rest,
		});
	}
	catch (err) {
		console.log("linkAndSignIn Error: ", err);
		return res.status(err.status).json(err.message);
	}
}

const forgotPw = async (req, res) => {
	try {
		const { email, newPw } = req.body;
		const existingUser = await checkEmailExists(dynamoDB, email);
		if (!existingUser) {
			return res.status(response_code.NO_USER_FOUND).json({ error: response_message.NO_USER_FOUND });
		}

		// Hash new password
		let hashedPw = '';
		if (newPw) {
			hashedPw = await hashPw(newPw);
		}
		// Update user
		params = {
			...params,
			Key: {
				userId: userId
			},
			UpdateExpression: "set pw = :pw",
			ExpressionAttributeValues: {
				":pw": hashedPw
			}
		}

		await dynamoDB.send(new UpdateCommand(params));
		console.log(`Password for user with ID ${userId} updated successfully`);
		return res.status(response_code.SUCCESS).json({ ok: true });
	}
	catch (err) {
		console.log("forgotPw Error: ", err.message)
		return res.status(err.status).json(err.message);
	}
};

module.exports = {
	checkUserExists,
	signup,
	linkAndSignIn,
	signin,
	forgotPw
}