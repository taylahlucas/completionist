require('dotenv').config();

module.exports = {
	mongodb: {
    // MongoDB connection URI
    url: process.env.MONGO_URL,
		options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // The directory where your migration files are located
  migrationsDir: "migrations",

  // The name of the collection where migration data will be stored in the database
  changelogCollectionName: "changelog",
};

