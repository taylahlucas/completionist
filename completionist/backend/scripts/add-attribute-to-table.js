require('dotenv').config();
const { dynamoDbDocClient } = require('../client');
const { ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

var params = {
  TableName: process.env.AWS_TABLE_NAME,
};

async function migrateData() {
  let lastKey;
  do {
    const data = await dynamoDbDocClient.send(new ScanCommand(params));

    for (const item of data.Items) {
      const newItem = {
        ...item,
        gameData: {
          lang: 'en',
          ...item.gameData,
        },
      };

      await dynamoDbDocClient.send(
        new PutCommand({
          ...params,
          Item: newItem,
        }),
      );
      console.log(`User ${item.id} has been updated`);
    }

    lastKey = data.LastEvaluatedKey;
  } while (lastKey);
}

module.exports = { migrateData };
