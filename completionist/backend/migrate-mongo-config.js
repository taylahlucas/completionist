require('dotenv').config();

const config = {
  mongodb: {
    // MongoDB connection URI
    url: process.env.MONGO_URL
  },

  // The directory where your migration files are located
  migrationsDir: "migrations",

  // The name of the collection where migration data will be stored in the database
  changelogCollectionName: "changelog",
};

module.exports = config;
