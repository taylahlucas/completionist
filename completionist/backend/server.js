require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sendEmailRoutes = require('./routes/send_email');

const PORT = process.env.PORT || 4002;

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB connection error: ", err))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// app.use(passport.initialize());
// app.use(passport.session());

//

app.use('/api', authRoutes);
app.use('/users', userRoutes);
app.use('/send_email', sendEmailRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
	mongoose.disconnect();
	server.close(() => {
		console.log('Server stopped');
		process.exit(0);
	});
});

// Passport Configuration -- is this section used?

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_WEB_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET
// },
//   (accessToken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }, (err, user) => {
//       if (err) return done(err);
//       if (!user) {
//         const newUser = new User({
//           googleId: profile.id,
//           displayName: profile.displayName,
//         });
//         newUser.save((saveErr) => {
//           if (saveErr) return done(saveErr);
//           return done(null, newUser);
//         });
//       } else {
//         return done(null, user);
//       }
//     });
//   }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });


// Check if the user is authenticated

// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/');
// };

// TODO: Implement Example protected route
// app.get('/protected', isAuthenticated, (req, res) => {
//   res.send('This is a protected route.');
// });

// Google Sign-In Route

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('/');
//   });