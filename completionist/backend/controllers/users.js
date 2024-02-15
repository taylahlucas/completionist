const User = require('../models/user');
const request_codes = require('../helpers/request_codes');

const getUserByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ userId: userId });
    if (user) {
      return res.status(request_codes.SUCCESS).json(user);
    }
		return res.status(request_codes.NO_USER_FOUND).json(null);
  } catch (error) {
    return res.status(request_codes.NOT_FOUND).json(error.message);
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { userId, steamId, subscription, settings } = req.body;

		const user = await User.findOne({ userId: userId });

		if (user) {
			const result = await user.updateOne({
				userId: userId,
				steamId: steamId,
				subscription: subscription,
				settings: settings
			 });
			 if (result.matchedCount > 0) {
				console.log(`User info with ID ${userId} updated successfully`);
				return res.status(request_codes.SUCCESS);
			}
			else {
				console.log(`Failed to updated user ${userId}`);
			}
		}
		else {
			return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
		}
  }
  catch(error) {
    return res.status(error.status).json(error.message);
  }
};

const updateUserData = async (req, res) => {
  try {
    const { userId, data } = req.body;
		const user = await User.findOne({ userId: userId });

		if (user) {
			const result = await user.updateOne({
				data: {
					skyrim: data.skyrim,
					fallout4: data.fallout4
				}
			 });
			 if (result.matchedCount > 0) {
				console.log(`User data with ID ${userId} updated successfully`);
				return res.status(request_codes.SUCCESS);
			}
			else {
				console.log(`Failed to updated user ${userId}`);
			}
		}
		else {
			return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
		}
  }
  catch(error) {
    return res.status(error.status).json(error.message);
  }
};

module.exports = {
  getUserByUserId,
  updateUserInfo,
	updateUserData
}