const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  userAvatar: String,
  subscription: [{
    id: String,
    isActive: Boolean,
  }],
  data: {
    type: Object,
    default: {
      skyrim: { quests: [], collectables: [], miscellaneous: [], locations: [] },
    }
  },
});

module.exports = mongoose.model('User', userSchema);