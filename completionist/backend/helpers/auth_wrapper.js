require('dotenv').config();
const checkAuthToken = require('./check_auth');
const cache = require('../cache');
const response_codes = require('./response_codes');

const authWrapper = ({ authFunction, onError }) => {
	return async (req, res) => {
		try {
			const authHeader = req.headers["authorization"];
			const token = authHeader && authHeader.split(' ')[1];
			if (!token) {
				res.status(response_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
				return false;
			}

			const isAuthorized = await checkAuthToken(token, process.env.JWT_SECRET, res);
			if (isAuthorized) {
				// If token is valid, run api
				return await authFunction(req, res);
			}
			else {
				// If token is not valid, get refresh token
				const refreshToken = cache.get(process.env.REFRESH_TOKEN_CACHE_KEY);
				if (refreshToken) {
					const isAuthorized = await checkAuthToken(refreshToken, process.env.JWT_REFRESH_SECRET, res);
					// If refresh token is valid, run api
					if (isAuthorized) {
						// TODO: Generate and send back a new jwt token
						return await authFunction(req, res);
					}
					else {
						// TODO: ensure user gets updated when they are logged out
						return res.status(response_codes.UNAUTHORIZED).json({ error: 'Unauthorized token' });
					}
				}
				else {
					return res.status(response_codes.UNAUTHORIZED).json({ error: 'Unauthorized token' });
				}
			}
		}
		catch (err) {
			console.log("authWrapper error: ", err)
			await onError(res, err);
		}
	};
};

module.exports = authWrapper;