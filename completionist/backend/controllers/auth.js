require('dotenv').config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPw = require('../helpers/hash_password');
const comparePws = require('../helpers/compare_passwords');
const request_codes = require('../helpers/request_codes');
const { checkEmailExists } = require('../helpers/check_existing_user');
const userSchema = require('../models/user');
const createUser = require('../helpers/create_user');

const dynamoDB = new DynamoDBClient({ region: process.env.REGION });
const docClient = DynamoDBDocumentClient.from(dynamoDB);

var params = {
	TableName: process.env.AWS_TABLE_NAME
};

const createSignedToken = () => jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
	expiresIn: "7d",
});

const checkUserExists = async (req, res) => {
	const { email } = req.body;
	// Checks if user exists and whether they have a regular or google account set up
	const existingUser = await checkEmailExists(docClient, email);

	if (existingUser) {
		return res.status(request_codes.SUCCESS)
			.json({
				regular: existingUser ? !!existingUser.pw : false,
				google: existingUser ? !!existingUser.googleId : false,
			});
	}
	else {
		return res.status(request_codes.SUCCESS).json({
			regular: false,
			google: false
		});
	}
};

const signup = async (req, res) => {
	const {
		userId,
		username,
		email,
		pw: userPw,
		googleId: userGoogleId,
	} = req.body;
	if (!userId) {
		return res.json({ error: "userId is required" });
	}

	const existingUser = await checkEmailExists(docClient, email);
	console.log("Existing user: ", existingUser)
	if (existingUser) {
		return res.status(request_codes.EMAIL_TAKEN).json('Email already exists.');
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
	// TODO: Add refresh token
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
		console.log("User Validation Error: ", err)
		return res.status(err.status).json(err.message);
	}
	params = {
		...params,
		Item: validatedUser
	};

	try {
		await dynamoDB.send(new PutCommand(params))
		const token = createSignedToken();
		const { pw, googleId, ...rest } = validatedUser;

		console.log("Signup Success: ", rest);
		return res.json({
			token,
			user: rest,
		});
	}
	catch (err) {
		console.log("Signup Error: ", err);
		return res.status(err.status).json(err.message);
	}
};

const signin = async (req, res) => {
	try {
		const { email, pw, googleId } = req.body;
		const existingUser = await checkEmailExists(docClient, email);
		if (!existingUser) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		if (existingUser.pw && pw) {
			const match = await comparePws(pw, existingUser.pw);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}
		}
		else if (existingUser.googleId && googleId) {
			const match = await comparePws(googleId, existingUser.googleId);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong google id",
				});
			}
		}

		// Create signed token
		const token = createSignedToken();
		existingUser.pw = undefined;
		existingUser.googleId = undefined;
		existingUser.secret = undefined;

		// TODO: Refresh token

		// Response with token and user data
		return res.status(request_codes.SUCCESS).json({
			token,
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
		return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
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
		const { pw, googleId, ...rest } = existingUser;

		// TODO: Refresh Token 
		console.log("linkAndSignIn Success: ", rest);
		return res.json({
			token,
			user: rest,
		});
	}
	catch (err) {
		console.log("linkAndSignIn Error: ", err);
		return res.status(err.status).json(err.message);
	}
}

// TODO: Update
const forgotPw = async (req, res) => {
	try {
		const { email, newPw } = req.body;
		const existingUser = await checkEmailExists(dynamoDB, email);
		if (!existingUser) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		// Hash new password
		let hashedPw = '';
		if (newPw) {
			hashedPw = await hashPw(newPw);
		}

		// await User.findOneAndUpdate(
		// 	{ 'userId': existingUser.userId },
		// 	{
		// 		password: hashedPassword
		// 	}
		// );
		return res.status(request_codes.SUCCESS).json({ ok: true });
	}
	catch (err) {
		console.log("Error: ", err.message)
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


// Example: Query command
// try {
//   const data = await dynamoDB.send(new QueryCommand(params));
//   console.log('Query succeeded No Match:', data.Items);
// 	if (!data.Items.length) {
// 		return res.status(request_codes.SUCCESS).json({
// 			regular: false,
// 			google: false
// 		});
// 	}
// 	else {
// 		const user = data.Items[0];
// 		console.log('Query succeeded:', data.Items);
// 		return res.status(request_codes.SUCCESS).json({
// 			regular: user ? !!user.password : false,
// 			google: user ? !!user.googleId : false,
// 		});
// 	}
// } catch (err) {
//   console.error('Unable to query the table. Error JSON:', JSON.stringify(err, null, 2));
// 	return res.status(request_codes.FAILURE);
// }