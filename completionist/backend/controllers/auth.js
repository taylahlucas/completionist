require('dotenv').config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPassword = require('../helpers/hash_password');
const comparePasswords = require('../helpers/compare_passwords');
const request_codes = require('../helpers/request_codes');
const { checkEmailExists } = require('../helpers/check_existing_user');
const userSchema = require('../models/user');
const createUser = require('../helpers/create_user');

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamoDB = DynamoDBDocumentClient.from(client);
var params = {
	TableName: process.env.AWS_TABLE_NAME
};

const createSignedToken = () => jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
	expiresIn: "7d",
});

const checkUserExists = async (req, res) => {
	const { email } = req.body;
	console.log("Running checkUserExists: ", email);

	// Checks if user exists and whether they have a regular or google account set up
	const existingUser = checkEmailExists(dynamoDB, email);
	if (existingUser) {
		return res.status(request_codes.SUCCESS)
			.json({
				regular: existingUser ? !!existingUser.password : false,
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
	console.log("Running signup");
	const {
		userId,
		name,
		email,
		pw: userPw,
		googleId: userGoogleId,
		userAvatar,
	} = req.body;

	if (!userId) {
		return res.json({ error: "userId is required" });
	}

	const existingUser = checkEmailExists(dynamoDB, email);
	
	if (existingUser) {
		return res.status(request_codes.EMAIL_TAKEN).json('Email already exists.');
	}

	// Hash password if password is provided
	let hashedPw = '';
	if (userPw) {
		hashedPw = await hashPassword(userPw)
	}

	let hashedGoogleId = '';
	if (userGoogleId) {
		hashedGoogleId = await hashPassword(userGoogleId)
	}

	let user = {
		userId,
		name,
		email,
		pw: hashedPw,
		googleId: hashedGoogleId
	}
	console.log("before-user: ", user)
	const updatedUser = createUser(user)
	const { err, value: validatedUser } = userSchema.validate(updatedUser);

	if (err) {
		console.log("VALIDATION ERROR: ", err)
		return res.status(err.status).json(err.message);
	}
	params = {
		...params,
		Item: validatedUser
	};
	console.log("USER: ", validatedUser)

	// client.send(new PutCommand(params), function (err, response) {
	// 	if (err) {
	// 		console.log("Signup Error: ", err);
	// 		return res.status(err.status).json(err.message);
	// 	}
	// 	else {
	// 		console.log("Signup Response: ", response);
	// 		const token = createSignedToken();
	// 		const { password, googleId, ...rest } = validatedUser._doc;
	
	// 		console.log("Signup Success: ", rest);
	// 		return res.json({
	// 			token,
	// 			user: rest,
	// 		});
	// 	}
	// });
};

// TODO: Update
const signin = async (req, res) => {
	try {
		const { email, password, googleId } = req.body;
		const existingUser = checkEmailExists(email);

		if (!existingUser) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		if (existingUser.password && password) {
			const match = await comparePasswords(password, existingUser.password);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}
		}
		if (existingUser.googleId && googleId) {
			const match = await comparePasswords(googleId, existingUser.googleId);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong google id",
				});
			}
		}

		// Create signed token
		const token = createSignedToken();
		existingUser.password = undefined;
		existingUser.googleId = undefined;
		existingUser.secret = undefined;


		// Response with token and user data
		return res.status(request_codes.SUCCESS).json({
			token,
			existingUser
		});
	} catch (err) {
		return res.status(err.status).json(err.message);
	}
};

// TODO: Update
const linkAndSignIn = async (req, res) => {
	const { email, password, googleId } = req.body;
	const existingUser = checkEmailExists(email);

	if (!existingUser) {
		return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
	}

	// If user does not have googleId, update googleId
	let hashedGoogleId;
	let hashedPassword;
	if (!existingUser.googleId && googleId) {
		hashedGoogleId = await hashPassword(googleId)
	}
	// TODO: If user does not have password, update password
	if (!existingUser.password && password) {
		hashedPassword = await hashPassword(password)
	}

	params = {
		...params,
		Item: {
			...existingUser,
			password: hashPassword ? hashedPassword : existingUser.userId,
			googleId: hashedGoogleId ? hashedGoogleId : existingUser.googleId
		}
	};

	dynamoDB.put(params, function (req, res) {
		if (err) {
			console.log("linkAndSignIn Error: ", err);
			return res.status(err.status).json(err.message);
		}
		else {
			const token = createSignedToken();
			const { password, googleId, ...rest } = existingUser._doc;

			console.log("linkAndSignIn Success: ", rest);
			return res.json({
				token,
				user: rest,
			});
		}
	});
}

// TODO: Update
const forgotPw = async (req, res) => {
	try {
		const { email, newPw } = req.body;
		const user = await User.findOne({ email }).limit(10);

		if (!user) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		// Hash new password
		let hashedPassword = '';
		if (newPw) {
			hashedPassword = await hashPassword(newPw);
		}

		await User.findOneAndUpdate(
			{ 'userId': user.userId },
			{
				password: hashedPassword
			}
		);
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


// EXample: Query command
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