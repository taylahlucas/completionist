const jwt = require('jsonwebtoken');
const User = require('../models/user');
const request_codes = require('../helpers/request_codes');

const checkAuthToken = async (req) => {
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

const getUserByUserId = async (req, res) => {
	const isAuthorized = await checkAuthToken(req);
	if (isAuthorized) {
		try {
			const userId = req.params.userId;
			const user = await User.findOne({ userId: userId });
			if (user) {
				return res.status(request_codes.SUCCESS).json(user);
			} else {
				return res.status(request_codes.EMAIL_NOT_FOUND).json({ error: 'User not found' });
			}
		} catch (error) {
			console.error('Error retrieving user:', error.message);
			return res.status(request_codes.NOT_FOUND).json(error.message);
		}
	}
};

const updateUser = async (req, res) => {
	console.log("checking is authorized")
	const isAuthorized = await checkAuthToken(req);
	console.log("isAuthorized");
	if (isAuthorized) {
		try {
			const { userId, steamId, signup, subscription, settings } = req.body;
			const result = await User.updateOne({
				userId: userId,
				steamId: steamId,
				signup: signup,
				subscription: subscription,
				settings: settings,
				data: {
					skyrim: data.skyrim,
					fallout4: data.fallout4,
					witcher3: data.witcher3
				}
			});
			console.log("RESULT:" , result)
			if (result.matchedCount > 0) {
				console.log(`User with ID ${userId} updated successfully`);
				return res.status(request_codes.SUCCESS);
			} else {
				console.log("NO MATCHED COUNT")
				return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
			}
		}
		catch (error) {
			return res.status(error.status).json(error.message);
		}
	}
};

module.exports = {
	getUserByUserId,
	updateUser
}