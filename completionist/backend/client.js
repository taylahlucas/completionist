require('dotenv').config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const awsRemoteConfig = {
	region: process.env.REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

// Initialize the DynamoDB client
const dynamoDbClient = new DynamoDBClient(awsRemoteConfig);
const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

module.exports = { dynamoDbDocClient };