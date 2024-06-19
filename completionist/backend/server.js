require('dotenv').config();
const AWS = require('aws-sdk');
const app = require('./app');

const PORT = process.env.PORT || 4002;

const awsRemoteConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

// Initialize the DynamoDB client
AWS.config.update(awsRemoteConfig);

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Server running successfully on port ${PORT}`);
});