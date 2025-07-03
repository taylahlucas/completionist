const jwt = require('jsonwebtoken');
const { response_code, response_message } = require('./response-code');

async function checkAuthToken(token, secret, res) {
  try {
    if (!token) {
      res
        .status(response_code.UNAUTHORIZED)
        .json({ error: response_message.UNAUTHORIZED });
      return false;
    }
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    console.log('Error with authentication: ', err.message);
    return false;
  }
}

module.exports = checkAuthToken;
