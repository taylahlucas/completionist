require('dotenv').config();
const { QueryCommand } = require('@aws-sdk/lib-dynamodb');

const checkEmailExists = async (client, email) => {
	let params = {
    TableName: process.env.AWS_TABLE_NAME,
		IndexName: 'email',
		KeyConditionExpression: 'email = :email',
		ExpressionAttributeValues: {
      ':email': email
    }
  }
	try {
		const response = await client.send(new QueryCommand(params));
		return response.Items.length > 0 ? response.Items[0] : null;
	}
	catch (err) {
		console.log("checkEmailExists error: ", err)
		return null;
	}
}

module.exports = { checkEmailExists };