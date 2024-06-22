const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
// const redis = require('redis');
const request_codes = require('../helpers/request_codes');
const checkAuthToken = require('../helpers/check_auth');

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamoDB = DynamoDBDocumentClient.from(client);

var params = {
	TableName: process.env.AWS_TABLE_NAME
};

// TODO: Update authentication
const getUserByUserId = async (req, res) => {
	// const isAuthorized = await checkAuthToken(req, res);
	// if (isAuthorized) {
	// }
	const { userId } = req.params;
	console.log("userId: ", userId);
	if (!userId) {
		return res.status(request_codes.SUCCESS);
	}
	params = {
		...params,
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': userId,
		},
	};

	try {
		const response = await dynamoDB.send(new QueryCommand(params));

		console.log('Query succeeded No Match:', response.Items);
		if (!data.Items.length) {
			return res.status(request_codes.SUCCESS);
		}
		else {
			const user = response.Items[0];
			console.log('Query succeeded:', user);
			return res.status(request_codes.SUCCESS).json(user);
		}
	} catch (err) {
		console.error('Unable to query the table. Error JSON:', JSON.stringify(err, null, 2));
		return res.status(request_codes.FAILURE);
	}
};

const updateSignUp = async (req, res) => {
	// const isAuthorized = await checkAuthToken(req, res);
	// if (isAuthorized) {}
	const userId = req.params.userId;
	const { verification, selectGame } = req.body;

	params = {
		...params,
		Key: {
			userId: userId
		},
		UpdateExpression: "set verification = :verification, setUsername = :setUsername, selectGame = :selectGame",
		ExpressionAttributeValues: {
			":verification": verification,
			// TODO: Add in FE
			":setUsername": true,
			":selectGame": selectGame,
		},
	};
	// TODO: Validate user

	dynamoDB.send(new UpdateCommand(params), function (err, response) {
		console.log("Updating signup")
		if (err) {
			console.log("Error updating signup: ", err.message);
			return res.status(request_codes.FAILURE).json(err.message);
		}
		else {
			// TODO: Refresh Token 
			console.log(`User with ID ${userId} verified successfully`);
			return res.status(request_codes.SUCCESS).json({ ok: true });
		}
	});
};

const updateUser = async (req, res) => {
	// const isAuthorized = await checkAuthToken(req, res);
	// if (isAuthorized) { }
	const userId = req.params.userId;
	const { username, email, steamId, activeGames, settings, data } = req.body;
	let updateExpression ="set username = :username, email = :email, activeGames = :activeGames, settings = :settings, gameData = :gameData";
	let expressionValues = {
		":username": username,
		":email": email,
		":activeGames": activeGames,
		":settings": settings,
		":gameData": data
	}
	if (steamId) {
		updateExpression += "steamId = :steamId, "
		expressionValues[":steamId"] = steamId;
	}

	params = {
		...params,
		Key: {
			userId: userId
		},
		UpdateExpression: updateExpression,
		ExpressionAttributeValues: expressionValues,
	};
	// TODO: Validate user
	dynamoDB.send(new UpdateCommand(params), function (err, response) {
		console.log("Updating user")
		if (err) {
			console.log("Error updating user: ", err.message);
			return res.status(request_codes.FAILURE).json(err.message);
		}
		else {
			// TODO: Refresh Token 
			console.log(`User with ID ${userId} updated successfully`);
			return res.status(request_codes.SUCCESS).json({ ok: true });
		}
	});
};

// TODO:
const changePassword = async (req, res) => {
	const isAuthorized = await checkAuthToken(req, res);
	// if (isAuthorized) {
	// 	try {
	// 		const userId = req.params.userId;
	// 		const { oldPw, newPw } = req.body;
	// 		const user = await User.findOne({ userId }).limit(10);

	// 		if (!user) {
	// 			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
	// 		}

	// 		// Compare given password
	// 		if (user.password && oldPw) {
	// 			const match = await comparePasswords(oldPw, user.password);
	// 			if (!match) {
	// 				return res.status(request_codes.WRONG_PASSWORD).json({
	// 					error: "Wrong password",
	// 				});
	// 			}
	// 		}

	// 		// Hash new password
	// 		let hashedPassword = '';
	// 		if (newPw) {
	// 			hashedPassword = await hashPassword(newPw)
	// 		}

	// 		await User.findOneAndUpdate(
	// 			{ 'userId': userId },
	// 			{
	// 				password: hashedPassword
	// 			}
	// 		);
	// 		return res.status(request_codes.SUCCESS).json({ ok: true });
	// 	}
	// 	catch (error) {
	// 		console.log("Error updating user: ", error.message);
	// 		return res.status(request_codes.FAILURE).json(error.message);
	// 	}
	// }
};

module.exports = {
	getUserByUserId,
	updateUser,
	updateSignUp,
	changePassword
}