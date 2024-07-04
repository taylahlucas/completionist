const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { response_code, response_message } = require('../helpers/response_code');
const authWrapper = require('../helpers/auth_wrapper');
const hashPw = require('../helpers/hash_password');
const comparePws = require('../helpers/compare_passwords');
const client = new DynamoDBClient({ region: process.env.REGION });
const dynamoDB = DynamoDBDocumentClient.from(client);

var params = {
	TableName: process.env.AWS_TABLE_NAME
};

const getUserByUserId = authWrapper({
	authFunction: async (req, res, token) => {
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
			return res.status(response_code.SUCCESS);
		}
		else {
			const user = response.Items[0];
			console.log('getUserByUserId Query succeeded');
			return res.status(response_code.SUCCESS).json({
				user,
				token
			});
		}
	},
	onError: (res, error) => {
		console.log("getUserByUserId Error: ", error.message);
		return res.status(response_code.FAILURE);
	}
});

const updateUser = authWrapper({
	authFunction: async (req, res, token) => {
		const userId = req.params.userId;
		const { username, email, steamId, activeGames, signup, settings, gameData } = req.body;
		let updateExpression = "set username = :username, email = :email, activeGames = :activeGames, signup = :signup, settings = :settings, gameData = :gameData";
		let expressionValues = {
			":userId": userId,
			":username": username,
			":email": email,
			":activeGames": activeGames,
			":signup": signup,
			":settings": settings,
			":gameData": gameData
		}
		if (steamId) {
			updateExpression += "steamId = :steamId"

			expressionValues[":steamId"] = steamId;
		}

		params = {
			...params,
			Key: {
				userId: userId
			},
			UpdateExpression: updateExpression,
			ConditionExpression: "userId = :userId",
			ExpressionAttributeValues: expressionValues,
		};

		await dynamoDB.send(new UpdateCommand(params));
		console.log(`User with ID ${userId} updated successfully`);
		return res.status(response_code.SUCCESS).json({ ok: true, token });
	},
	onError: (res, err) => {
		console.log("updateUser Error: ", err.message);
		return res.status(response_code.FAILURE).json(err.message);
	}
});

const changePassword = authWrapper({
	authFunction: async (req, res) => {
		const userId = req.params.userId;
		const { oldPw, newPw } = req.body;

		// Get user pw from backend
		params = {
			...params,
			Key: {
				userId: userId,
			},
			ConditionExpression: "userId = :userId",
			ExpressionAttributeValues: {
				":userId": userId,
			},
		}
		const response = await dynamoDB.send(new QueryCommand(params));
		if (!response.Items.length) {
			console.log('getUserByUserId No Match');
			return res.status(response_code.NO_USER_FOUND).json({ error: response_message.NO_USER_FOUND });
		}

		const user = response.Items[0];
		// Compare given password
		if (user.pw && oldPw) {
			const match = await comparePws(oldPw, user.pw);
			if (!match) {
				return res.status(response_code.WRONG_PASSWORD).json({
					error: response_message.WRONG_PASSWORD,
				});
			}

		}
		// Hash new password
		let hashedPw = '';
		if (newPw) {
			hashedPw = await hashPw(newPw)
		}

		// Update user
		params = {
			...params,
			Key: {
				userId: userId
			},
			UpdateExpression: "set pw = :pw",
			ConditionExpression: "userId = :userId",
			ExpressionAttributeValues: {
				":pw": hashedPw
			}
		}

		await dynamoDB.send(new UpdateCommand(params));
		console.log(`Password for user with ID ${userId} updated successfully`);
		return res.status(response_code.SUCCESS).json({ ok: true });
	},
	onError: (res, err) => {
		console.log("changePassword Error: ", err.message);
		return res.status(response_code.FAILURE).json(err.message);
	}
});

const deleteUser = authWrapper({
	authFunction: async (req, res) => {
		const userId = req.params.userId;
		console.log("deleting user userId: ", userId)
		params = {
			...params,
			Key: {
				userId: userId,
			},
			ConditionExpression: "userId = :userId",
			ExpressionAttributeValues: {
				":userId": userId,
			},
		};
		await dynamoDB.send(new DeleteCommand(params));
		console.log('User deleted successfully');
		return res.status(response_code.SUCCESS).json({ ok: true });
	},
	onError: (res, err) => {
		console.log("deleteUser Error: ", err.message);
		return res.status(response_code.FAILURE).json(err.message);
	}
})

module.exports = {
	getUserByUserId,
	updateUser,
	changePassword,
	deleteUser
}