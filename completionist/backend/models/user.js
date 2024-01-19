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
      { id: 'Skyrim', isActive: true },
      { id: 'Fallout 4', isActive: true }
    ]
  },
  settings: {
    type: [{
      type: String,
      isActive: Boolean,
    }],
    default: [
      { type: 'COMPLETED_ITEMS', isActive: true },
      { type: 'DISABLED_SECTIONS', isActive: true }
    ]
  },
  data: {
    type: Object,
    default: {
      skyrim: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [] },
      fallout4: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [] },
    }
  },
});

module.exports = mongoose.model('User', userSchema);