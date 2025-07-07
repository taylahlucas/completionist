const { dynamoDbDocClient } = require('../client');
const {
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');
const authWrapper = require('../helpers/auth-wrapper');
const hashPw = require('../helpers/hash-password');
const comparePws = require('../helpers/compare-passwords');
const {
  response_code,
  response_message,
  loggerType,
  apiNames,
} = require('../utils/constants');
const log = require('../helpers/logger');

var params = {
  TableName: process.env.AWS_TABLE_NAME,
};

const getUserByUserId = authWrapper({
  authFunction: async (req, res, token) => {
    const userId = req.params.userId;
    log(loggerType.request, apiNames.getUserByUserId, { userId });
    params = {
      ...params,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const response = await dynamoDbDocClient.send(new QueryCommand(params));
    if (!response.Items.length) {
      log(loggerType.success, apiNames.getUserByUserId, { match: false });
      return res.status(response_code.SUCCESS);
    } else {
      const user = response.Items[0];
      log(loggerType.success, apiNames.getUserByUserId, { match: true });
      return res.status(response_code.SUCCESS).json({
        user,
        userId,
        token,
      });
    }
  },
  onError: (res, err) => {
    log(loggerType.error, apiNames.getUserByUserId, { err });
    return res.status(response_code.FAILURE);
  },
});

const updateUser = authWrapper({
  authFunction: async (req, res, token) => {
    const userId = req.params.userId;
    log(loggerType.request, apiNames.updateUser, { userId });
    const { username, email, steamId, signup, settings, gameData } = req.body;
    let updateExpression =
      'set username = :username, email = :email, signup = :signup, settings = :settings, gameData = :gameData';
    let expressionValues = {
      ':userId': userId,
      ':username': username,
      ':email': email,
      ':signup': signup,
      ':settings': settings,
      ':gameData': gameData,
    };
    if (steamId) {
      updateExpression += ', steamId = :steamId';

      expressionValues[':steamId'] = steamId;
    }

    params = {
      ...params,
      Key: {
        userId: userId,
      },
      UpdateExpression: updateExpression,
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: expressionValues,
    };

    await dynamoDbDocClient.send(new UpdateCommand(params));
    log(loggerType.success, apiNames.updateUser);
    return res.status(response_code.SUCCESS).json({ ok: true, userId, token });
  },
  onError: (res, err) => {
    log(loggerType.error, apiNames.updateUser, { err });
    return res.status(response_code.FAILURE).json(err.message);
  },
});

const changePassword = authWrapper({
  authFunction: async (req, res, token) => {
    const userId = req.params.userId;
    log(loggerType.request, apiNames.changePassword, { userId });
    const { oldPw, newPw } = req.body;

    // Get user pw from backend
    params = {
      ...params,
      Key: {
        userId: userId,
      },
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const response = await dynamoDbDocClient.send(new QueryCommand(params));
    if (!response.Items.length) {
      log(loggerType.error, apiNames.changePassword, {
        code: response_code.NO_USER_FOUND,
        message: response_code.NO_USER_FOUND,
      });
      return res
        .status(response_code.NO_USER_FOUND)
        .json({ error: response_message.NO_USER_FOUND });
    }

    const user = response.Items[0];
    // Compare given password
    if (user.pw && oldPw) {
      const match = await comparePws(oldPw, user.pw);
      if (!match) {
        log(loggerType.error, apiNames.changePassword, {
          code: response_code.WRONG_PASSWORD,
          message: response_code.WRONG_PASSWORD,
        });
        return res.status(response_code.WRONG_PASSWORD).json({
          error: response_message.WRONG_PASSWORD,
        });
      }
    }
    // Hash new password
    let hashedPw = '';
    if (newPw) {
      hashedPw = await hashPw(newPw);
    }

    // Update user
    params = {
      ...params,
      Key: {
        userId: userId,
      },
      UpdateExpression: 'set pw = :pw',
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':pw': hashedPw,
      },
    };

    await dynamoDbDocClient.send(new UpdateCommand(params));
    log(loggerType.success, apiNames.changePassword);
    return res.status(response_code.SUCCESS).json({ ok: true, userId, token });
  },
  onError: (res, err) => {
    log(loggerType.error, apiNames.changePassword, { err });
    return res.status(response_code.FAILURE).json(err.message);
  },
});

const deleteUser = authWrapper({
  authFunction: async (req, res) => {
    const userId = req.params.userId;
    log(loggerType.request, apiNames.deleteUser, { userId });
    params = {
      ...params,
      Key: {
        userId: userId,
      },
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    await dynamoDbDocClient.send(new DeleteCommand(params));
    log(loggerType.success, apiNames.deleteUser);
    return res.status(response_code.SUCCESS).json({ ok: true });
  },
  onError: (res, err) => {
    log(loggerType.error, apiNames.deleteUser, { err });
    return res.status(response_code.FAILURE).json(err.message);
  },
});

module.exports = {
  getUserByUserId,
  updateUser,
  changePassword,
  deleteUser,
};
