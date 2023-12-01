// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://taylahlucasdev:JsSPrAgEMtht3QKC@completionist.eu0rfdl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
