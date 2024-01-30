const mongoose = require('mongoose');
const {
  skyrimSettingsConfig,
  fallout4SettingsConfig
} = require('./initialUserData');

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
      { id: 'skyrim', isActive: true },
      { id: 'fallout4', isActive: true }
    ]
  },
  settings: {
    type: [{
      id: String,
      isActive: Boolean,
    }],
    default: [
      { id: 'completedItems', isActive: true },
      { id: 'disabledSections', isActive: true }
    ]
  },
  data: {
    type: Object,
    default: {
      skyrim: {
        quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: skyrimSettingsConfig
      },
      fallout4: {
        quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: fallout4SettingsConfig
      },
    }
  },
});

module.exports = mongoose.model('User', userSchema);