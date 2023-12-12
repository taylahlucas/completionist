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
    skyrim: {
      quests: {
        id: String,
        isComplete: Boolean,
      },
      collectables: {
        id: String,
        isComplete: Boolean,
      },
      books: {
        id: String,
        isComplete: Boolean,
      },
      locations: {
        id: String,
        isComplete: Boolean,
      },
    },
  },
});

module.exports = mongoose.model('User', userSchema);