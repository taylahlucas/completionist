const jwt = require('jsonwebtoken');
const User = require('../models/user');
const request_codes = require('../helpers/request_codes');

const checkAuthToken = async (req) => {
	const auth_header = req.headers["authorization"];
	const auth_token = auth_header && auth_header.split(' ')[1];

	try {
		if (!auth_token) {
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
	else {
		return res.status(request_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
	}
};

const updateUserInfo = async (req, res) => {
	const isAuthorized = await checkAuthToken(req);
	if (isAuthorized) {
		try {
			const { userId, steamId, subscription, settings } = req.body;
			const result = await User.updateOne({
				userId: userId,
				steamId: steamId,
				subscription: subscription,
				settings: settings
			});
			if (result.matchedCount > 0) {
				console.log(`User info with ID ${userId} updated successfully`);
				return res.status(request_codes.SUCCESS);
			} else {
				return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
			}
		}
		catch (error) {
			return res.status(error.status).json(error.message);
		}
	}
	else {
		return res.status(request_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
	}
};

const updateUserData = async (req, res) => {
	const isAuthorized = await checkAuthToken(req);
	if (isAuthorized) {
		try {
			const { userId, data } = req.body;
			const result = await User.updateOne({
				userId: userId,
				data: {
					skyrim: data.skyrim,
					fallout4: data.fallout4
				}
			});
			if (result.matchedCount > 0) {
				console.log(`User data with ID ${userId} updated successfully`);
				return res.status(request_codes.SUCCESS);
			} else {
				return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
			}
		}
		catch (error) {
			return res.status(error.status).json(error.message);
		}
	}
	else {
		return res.status(request_codes.UNAUTHORIZED).json({ error: 'Unauthorized' });
	}
};

module.exports = {
	getUserByUserId,
	updateUserInfo,
	updateUserData
}