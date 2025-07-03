require('dotenv').config();
const { dynamoDbDocClient } = require('../client');
const { QueryCommand } = require('@aws-sdk/lib-dynamodb');
const authWrapper = require('../helpers/auth_wrapper');
const { response_code } = require('../helpers/response-code');

var params = {
  TableName: process.env.AWS_GAME_TABLE_NAME,
};

const getDataForGame = authWrapper({
  authFunction: async (req, res, token) => {
    const { game, lang } = req.query;

    params = {
      ...params,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': `GAME#${game}#LANG#${lang}`,
      },
    };

    const response = await dynamoDbDocClient.send(new QueryCommand(params));
    if (!response.Items.length) {
      console.log(`Could not retrieve items for ${game} in ${lang}`);
      return res.status(response_code.SUCCESS);
    } else {
      console.log(`Returning game data for ${game} in ${lang}`);
      return res.status(response_code.SUCCESS).json({
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
