require('dotenv').config();
const { dynamoDbDocClient } = require('../client');
const { QueryCommand } = require('@aws-sdk/lib-dynamodb');

var params = {
  TableName: process.env.AWS_GAME_TABLE_NAME,
};

const getDataForGame = authWrapper({
  authFunctions: async (req, res, token) => {
    const { game, lang } = req.body;

    params = {
      ...params,
      KeyConditionExpression: 'begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': `GAME#${game}#LANG#${lang}`,
      },
    };

    const response = await dynamoDbDocClient.send(new QueryCommand(params));
    if (!response.Items.length) {
      console.log(`Could not retrieve items for ${game} in ${lang}`);
      return res.status(response_code.SUCCESS);
    } else {
      return res.status(response_codes.SUCCESS).json({
        response,
        token,
      });
    }
  },
  onError: (res, error) => {
    console.log('getDataForGame Error: ', error.message);
    return res.status(response_code.FAILURE);
  },
});

module.exports = {
  getDataForGame,
};
