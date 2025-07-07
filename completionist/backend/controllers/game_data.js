require('dotenv').config();
const { dynamoDbDocClient } = require('../client');
const { QueryCommand } = require('@aws-sdk/lib-dynamodb');
const authWrapper = require('../helpers/auth-wrapper');
const { response_code, apiNames, loggerType } = require('../utils/constants');
const log = require('../helpers/logger');

var params = {
  TableName: process.env.AWS_GAME_TABLE_NAME,
};

const getDataForGame = authWrapper({
  authFunction: async (req, res, token) => {
    const { game, lang } = req.query;
    log(loggerType.request, apiNames.getDataForGame, { game, lang });
    params = {
      ...params,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': `GAME#${game}#LANG#${lang}`,
      },
    };

    const response = await dynamoDbDocClient.send(new QueryCommand(params));
    if (!response.Items.length) {
      log(loggerType.success, apiNames.getDataForGame, { itemLength: 0 });
      return res.status(response_code.SUCCESS);
    } else {
      log(loggerType.success, apiNames.getDataForGame, {
        itemLength: response.Items.length,
      });
      return res.status(response_code.SUCCESS).json({
        response,
        token,
      });
    }
  },
  onError: (res, err) => {
    log(loggerType.error, apiNames.getDataForGame, {
      err,
    });
    return res.status(response_code.FAILURE);
  },
});

module.exports = {
  getDataForGame,
};
