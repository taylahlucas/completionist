
const jwt = require('jsonwebtoken');
const request_codes = require('../helpers/request_codes');

async function checkAuthToken(req, res) {
	const authHeader = req.headers["authorization"];
	console.log("authHeader: ", authHeader);
	const authToken = authHeader && authHeader.split(' ')[1];
	console.log("authToken: ", authToken);

	try {
		if (!authToken) {
			res.status(request_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
			return false;
		}
		jwt.verify(authToken, process.env.JWT_SECRET);
		return true;
	} catch (error) {
		console.log("Error with authentication: ", error.message)
		return false;
	}
}

module.exports = checkAuthToken;