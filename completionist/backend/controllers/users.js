const User = require('../models/user');
const request_codes = require('../helpers/request_codes');

const getUserByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (user) {
      return res.status(request_codes.SUCCESS).json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error.message);
    return res.status(500).json(error.message);
  }
};

const updateUserData = async (req, res) => {
  const { userId, subscription, settings, skyrimData, fallout4Data } = req.body;

  try {
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
      return res.status(200);
    } else {
      console.error('Error retrieving user:', error.message);
      return res.status(404).json({ error: 'User not found' });
    }
  }
  catch(error) {
    console.log("Error updating data: ", error.message)
    res.status(error.status).json(error.message);
  }
};

module.exports = {
  getUserByUserId,
  updateUserData
}