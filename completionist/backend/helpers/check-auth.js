const jwt = require('jsonwebtoken');
const { response_code, response_message } = require('../utils/constants');

async function checkAuthToken(token, secret, res) {
  try {
    if (!token) {
      log(loggerType.error, apiNames.authToken, {
        code: response_code.UNAUTHORIZED,
        message: response_code.UNAUTHORIZED,
      });
      res
        .status(response_code.UNAUTHORIZED)
        .json({ error: response_message.UNAUTHORIZED });
      return false;
    }
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    log(loggerType.error, apiNames.authToken, { err });
    return false;
  }
}

module.exports = checkAuthToken;
