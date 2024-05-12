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
			const user = await User.findOne({ userId }).limit(10);
			return res.status(request_codes.SUCCESS).json(user);

		} catch (error) {
			return res.status(request_codes.NO_USER_FOUND).json(error.message);
		}
	}
};

const updateSignUp = async (req, res) => {
	const isAuthorized = await checkAuthToken(req);
	if (isAuthorized) {
		try {
			const userId = req.params.userId;
			const { verification, selectPlan, selectGame } = req.body;

			const result = await User.findOneAndUpdate(
				{ 'userId': userId },
				{
					signup: {
						verification: verification,
						selectPlan: selectPlan,
						selectGame: selectGame
					}
				}
			);

			if (result.matchedCount > 0) {
				console.log(`User with ID ${userId} verified successfully`);
				return res.status(request_codes.SUCCESS);
			} else {
				return res.status(request_codes.NO_USER_FOUND).json({ error: 'User not found' });
			}
		}
		catch (error) {
			console.log("Error verifying user: ", error.message);
			return res.status(request_codes.FAILURE).json(error.message);
		}
	}
};

const updateUser = async (req, res) => {
	const isAuthorized = await checkAuthToken(req);
	if (isAuthorized) {
		try {
			const userId = req.params.userId;
			const { steamId, subscription, settings, data } = req.body;
			
			const result = await User.findOneAndUpdate(
				{ 'userId': userId },
				{
					steamId: steamId,
					subscription: subscription,
					settings: settings,
					data: data
				}
			);
			if (result.matchedCount > 0) {
				console.log(`User with ID ${userId} updated successfully`);
				return res.status(request_codes.SUCCESS);
			} else {
				return res.status(request_codes.NO_USER_FOUND).json({ error: 'User not found' });
			}
		}
		catch (error) {
			console.log("Error updating user: ", error.message);
			return res.status(request_codes.FAILURE).json(error.message);
		}
	}
};

module.exports = {
	getUserByUserId,
	updateUser,
	updateSignUp
}