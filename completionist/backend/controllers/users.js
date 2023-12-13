const User = require('../models/user');

const getUserByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserData = async (req, res) => {
  const { userId, skyrimData, fallout4Data } = req.body;

  try {
    const result = await User.updateOne({ 
      userId: userId,
      data: {
        skyrim: skyrimData,
        fallout4: fallout4Data
      }
     });
     if (result.matchedCount > 0) {
      console.log(`User with ID ${userId} updated successfully`);
    } else {
      console.log(`User with ID ${userId} not found`);
    }
  }
  catch(error) {
    console.log("Error updating user data: ", error);
  }

};

module.exports = {
  getUserByUserId,
  updateUserData
}