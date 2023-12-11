const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  userAvatar: String,
  subscription: [{
    id: mongoose.Types.ObjectId,
    isActive: Boolean,
  }],
  data: {
    skyrim: {
      quests: {
        id: mongoose.Types.ObjectId,
        isComplete: Boolean,
      },
      collectables: {
        id: mongoose.Types.ObjectId,
        isComplete: Boolean,
      },
      books: {
        id: mongoose.Types.ObjectId,
        isComplete: Boolean,
      },
      locations: {
        id: mongoose.Types.ObjectId,
        isComplete: Boolean,
      },
    },
  },
});

module.exports = mongoose.model('User', userSchema);