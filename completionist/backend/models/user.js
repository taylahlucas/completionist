const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  userAvatar: String,
  subscription: [{
    id: String,
    isActive: Boolean,
  }],
  data: {
    type: Object,
    default: {
      skyrim: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [] },
      fallout4: { quests: [], collectables: [], miscellaneous: [], locations: [], settingsConfig: [] },
    }
  },
});

module.exports = mongoose.model('User', userSchema);