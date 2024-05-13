const User = require('../models/user');
const request_codes = require('../helpers/request_codes');
const hashPassword = require('../helpers/hash_password');
const comparePasswords = require('../helpers/compare_passwords');
const checkAuthToken = require('../helpers/check_auth');

const getUserByUserId = async (req, res) => {
	const isAuthorized = await checkAuthToken(req, res);
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
	const isAuthorized = await checkAuthToken(req, res);
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
	const isAuthorized = await checkAuthToken(req, res);
	if (isAuthorized) {
		try {
			const userId = req.params.userId;
			const { name, email, steamId, subscription, settings, data } = req.body;
			const result = await User.findOneAndUpdate(
				{ 'userId': userId },
				{
					name: name,
					email: email,
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

const changePassword = async (req, res) => {
	const isAuthorized = await checkAuthToken(req, res);
	if (isAuthorized) {
		try {
			const userId = req.params.userId;
			const { oldPw, newPw } = req.body;
			const user = await User.findOne({ userId }).limit(10);

			if (!user) {
				return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
			}

			// Compare given password
			if (user.password && oldPw) {
				const match = await comparePasswords(oldPw, user.password);
				if (!match) {
					return res.status(request_codes.WRONG_PASSWORD).json({
						error: "Wrong password",
					});
				}
			}

			// Hash new password
			let hashedPassword = '';
			if (newPw) {
				hashedPassword = await hashPassword(newPw)
			}

			await User.findOneAndUpdate(
				{ 'userId': userId },
				{
					password: hashedPassword
				}
			);
			return res.status(request_codes.SUCCESS).json({ ok: true });
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
	updateSignUp,
	changePassword
}