
const jwt = require('jsonwebtoken');
const request_codes = require('../helpers/request_codes');

async function checkAuthToken(req, res) {
	const auth_header = req.headers["authorization"];
	const auth_token = auth_header && auth_header.split(' ')[1];

	try {
		if (!auth_token) {
			res.status(request_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
			return false;
		}
		jwt.verify(auth_token, process.env.JWT_SECRET);
		return true;
	} catch (error) {
		console.log("Error with authentication: ", error.message)
		return false;
	}
}

module.exports = checkAuthToken;