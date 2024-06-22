
const jwt = require('jsonwebtoken');
const response_codes = require('../helpers/response_codes');

async function checkAuthToken(token, secret, res) {
	try {
		if (!token) {
			res.status(response_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
			return false;
		}
		jwt.verify(token, secret);
		return true;
	} 
	catch (err) {
		console.log("Error with authentication: ", err.message)
		return false;
	}
}

module.exports = checkAuthToken;