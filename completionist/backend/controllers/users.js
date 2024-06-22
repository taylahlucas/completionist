const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const response_codes = require('../helpers/response_codes');
const authWrapper = require('../helpers/auth_wrapper');

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamoDB = DynamoDBDocumentClient.from(client);

var params = {
	TableName: process.env.AWS_TABLE_NAME
};

const getUserByUserId = authWrapper({
	authFunction: async (req, res) => {
		const userId = req.params.userId;
		params = {
			...params,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': userId,
			},
		}
		const response = await dynamoDB.send(new QueryCommand(params));
		if (!response.Items.length) {
			console.log('getUserByUserId No Match');
			return res.status(response_codes.SUCCESS);
		}
		else {
			const user = response.Items[0];
			console.log('getUserByUserId Query succeeded');
			return res.status(response_codes.SUCCESS).json(user);
		}
	},
	onError: (res, error) => {
		console.log("getUserByUserId Error: ", error.message);
		return res.status(response_codes.FAILURE);
	}
});

const updateUser = authWrapper({
	authFunction: async (req, res) => {
		const userId = req.params.userId;
		const { username, email, steamId, activeGames, signup, settings, gameData } = req.body;
		let updateExpression = "set username = :username, email = :email, activeGames = :activeGames, signup = :signup, settings = :settings, gameData = :gameData";
		let expressionValues = {
			":username": username,
			":email": email,
			":activeGames": activeGames,
			":signup": signup,
			":settings": settings,
			":gameData": gameData
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

		await dynamoDB.send(new UpdateCommand(params));
		console.log(`User with ID ${userId} updated successfully`);
		return res.status(response_codes.SUCCESS).json({ ok: true });
	},
	onError: (res, err) => {
		console.log("updateUser Error: ", err.message);
		return res.status(response_codes.FAILURE).json(err.message);
	}
});

const changePassword = authWrapper({
	authFunction: async (req, res) => {
		const userId = req.params.userId;
		const { oldPw, newPw } = req.body;

		// Get user pw from backend
		params = {
			...params,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': userId,
			},
		}
		const response = await dynamoDB.send(new QueryCommand(params));
		if (!response.Items.length) {
			console.log('getUserByUserId No Match');
			return res.status(response_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		const user = response.Items[0];
		// Compare given password
		if (user.password && oldPw) {
			const match = await comparePasswords(oldPw, user.pw);
			if (!match) {
				return res.status(response_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}

		}
		// Hash new password
		let hashedPw = '';
		if (newPw) {
			hashedPw = await hashPassword(newPw)
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
		return res.status(response_codes.SUCCESS).json({ ok: true });
	},
	onError: (res, err) => {
		console.log("changePassword Error: ", err.message);
		return res.status(response_codes.FAILURE).json(err.message);
	}
});

module.exports = {
	getUserByUserId,
	updateUser,
	changePassword
}