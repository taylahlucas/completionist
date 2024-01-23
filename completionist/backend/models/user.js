const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  userAvatar: String,
  subscription: {
    type: [{
      id: String,
      isActive: Boolean,
    }],
    default: [
      // TODO: Change this when adding subscription. Only add previously purchased/subscribed games
      { id: 'Skyrim', isActive: true },
      { id: 'Fallout 4', isActive: true }
    ]
  },
  settings: {
    type: [{
      id: String,
      isActive: Boolean,
    }],
    default: [
      { id: 'Completed Items', isActive: true },
      { id: 'Disabled Sections', isActive: true }
    ]
  },
  data: {
    type: Object,
    // TODO: Change this when adding subscription. Only add previously purchased/subscribed games
    default: {
      skyrim: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [] },
      fallout4: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [] },
    }
  },
});

module.exports = mongoose.model('User', userSchema);