const User = require('../models/user');
const request_codes = require('../helpers/request_codes');

const getUserByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ userId: userId });
    if (user) {
      return res.status(request_codes.SUCCESS).json(user);
    } else {
      return res.status(605).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Logging Error retrieving user:', error.message);
    return res.status(500).json(error.message);
  }
};

const updateUserData = async (req, res) => {
  try {
    const { userId, subscription, settings, skyrimData, fallout4Data } = req.body;

    const result = await User.updateOne({ 
      userId: userId,
      subscription: subscription,
      settings: settings,
      data: {
        skyrim: skyrimData,
        fallout4: fallout4Data
      }
     });
     if (result.matchedCount > 0) {
      console.log(`User with ID ${userId} updated successfully`);
      return res.status(request_codes.SUCCESS).json(result.user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  }
  catch(error) {
    console.log("Logging Error updating data: ", error.message)
    res.status(error.status).json(error.message);
  }
};

module.exports = {
  getUserByUserId,
  updateUserData
}