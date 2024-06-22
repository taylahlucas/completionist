require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sendEmailRoutes = require('./routes/send_email');
const steamRoutes = require('./routes/steam');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use('/api', authRoutes);
app.use('/users', userRoutes);
app.use('/send_email', sendEmailRoutes);
app.use('/steam', steamRoutes);

module.exports = app;