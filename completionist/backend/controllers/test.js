// const dynamoDB = require('../server');
const AWS = require('aws-sdk');

const awsRemoteConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

AWS.config.update(awsRemoteConfig);
	
const dynamoDB = new AWS.DynamoDB({ region: process.env.REGION });

const getUser = function (req, res) {
	const params = {
		TableName: process.env.AWS_TABLE_NAME
	};

	dynamoDB.scan(params, function (err, data) {
		if (err) {
			console.log("Get User Error: ", err)
		}
		else {
			const { Items } = data;
			console.log("Get User Success: ", data);
			// TODO: Filter item by userId
			res.send({
				success: true,
				users: data
			})
		}
	})
};

const addUser = function (req, res) {
	const Item = { ...req, body };
	Item.id = uuidv4();

	var params = {
		TableName: process.env.TABLE_NAME,
		Item: Item
	};

	dynamoDB.put(params, function (err, data) {
		if (err) {
			console.log("Add User Error: ", err);
		}
		else {
			console.log("Add User Success");
		}
	})
}

module.exports = {
	getUser,
	addUser
}