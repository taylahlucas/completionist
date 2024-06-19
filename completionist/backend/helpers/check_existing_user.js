require('dotenv').config();
const { GetCommand } = require('@aws-sdk/lib-dynamodb');

const checkEmailExists = (client, email) => {
	let params = {
    TableName: process.env.AWS_TABLE_NAME,
    Item: {
      email: email
    },
  }

	client.send(new GetCommand(params), function (err, response) {
		if (err) return null;
		else response.Items.length > 0 ? response.Items[0] : null;
	});
}

module.exports = { checkEmailExists };