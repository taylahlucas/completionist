const checkAuthToken = require('./check_auth');

const authWrapper = ({ authFunction, onError }) => {
	return async (req, res) => {
		try {
			// check auth token
			// if token valid, run api
			// if token invalid, use refreshToken

			const isAuthorized = await checkAuthToken(req, res);
			if (!isAuthorized) {
				// If token is not valid, get refresh token
				console.log("Not authorized")
				return res.status(response_codes.UNAUTHORIZED).json({ error: 'Unauthorized token' });
				// const refreshAuth = await checkRefreshToken(user.refreshToken, res);

				// if (refreshAuth) {
				// 	console.log("Calling auth function--2")
				// 	return await authFunction(req, res, user);
				// }
				// else {
				// 	console.log("Not refresh authorized")
				// 	return res.status(response_codes.UNAUTHORIZED).json({ error: 'Unauthorized token' });
				// }
			}
			else {
				// If token is valid, run api
				console.log("Calling auth function--2")
				return await authFunction(req, res);
			}
		}
		catch (err) {
			console.log("authWrapper error: ", err)
			await onError(res, err);
		}
	};
};

module.exports = authWrapper;