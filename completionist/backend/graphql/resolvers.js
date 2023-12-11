const mongoose = require('mongoose');
const User = require('../models/user');

// Update your GraphQL resolvers

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        //mongoose.Types.ObjectId(userId) or userId
        const user = await User.findById(mongoose.Types.ObjectId(userId));
        return user;
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user by ID');
      }
    },
  },
  Mutation: {
    createUser: async (_, { userId, name, email, userAvatar, subscription, data }) => {
      try {
        console.log("CREATING USER--backend")
        const newUser = new User({ userId, name, email, userAvatar, subscription, data });
        await newUser.save();
        return newUser;
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user by ID');
      }
    },
    updateSkyrimData: async (_, { userId, quests, collectables, books, locations }) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              'data.skyrim.quests': quests,
              'data.skyrim.collectables': collectables,
              'data.skyrim.books': books,
              'data.skyrim.locations': locations,
            },
          },
          { new: true }
        );

        return user;
      } catch (error) {
        console.error('Error updating user Skyrim data:', error);
        throw new Error('Failed to update user Skyrim data');
      }
    },
  },
};

module.exports = resolvers;
