// Auth

require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPassword = require('../helpers/hash_password');
const comparePasswords = require('../helpers/compare_passwords');
const request_codes = require('../helpers/request_codes');
const { findUserByEmail } = require('../helpers/find_user');

// https://medium.com/@xiaominghu19922/authentication-and-authorization-with-nodejs-react-and-typescript-part-2-ae9d320e4f74
const checkUserExists = async (req, res) => {
	// Checks if user already has a google or regular account set up
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).limit(10);

		return res.status(request_codes.SUCCESS).json({
			regular: user ? !!user.password : false,
			google: user ? !!user.googleId : false
		});
	}
	catch (err) {
		// return res.status(err.status).json(err.message);
		console.log("checkUserExists: ", err)
		return res.status(request_codes.SUCCESS).json({
			regular: false,
			google: false
		});
	}
}

const signup = async (req, res) => {
	try {
		const {
			userId,
			name,
			email,
			password: userPassword,
			googleId: userGoogleId,
			userAvatar,
		} = req.body;

		if (!userId) {
			res.json({ error: "userId is required" });
		}

		const existingUser = findUserByEmail(res, email, true);
		if (existingUser) {
 			return res.status(request_codes.EMAIL_TAKEN).json({ error: "Email already exists." });
		}

		// Hash password if password is provided
		let hashedPassword = '';
		if (userPassword) {
			hashedPassword = await hashPassword(userPassword)
		}

		let hashedGoogleId = '';
		if (userGoogleId) {
			hashedGoogleId = await hashPassword(userGoogleId)
		}
		
		// Create new user
		const user = await new User({
			userId,
			name,
			email,
			password: hashedPassword,
			googleId: hashedGoogleId,
			userAvatar,
		}).save();

		// Create signed token
		const token = jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		// Remove password from the user object
		const { password, googleId, ...rest } = user._doc;

		// Response with token and user data
		return res.json({
			token,
			user: rest,
		});
	} catch (err) {
		return res.status(err.status).json(err.message);
	}
};

const signin = async (req, res) => {
	try {
		const { email, password, googleId } = req.body;
		const user = findUserByEmail(res, email, false);

		// If user has password, check if the password matches
		if (!!user.password && !!password) {
			const match = await comparePasswords(password, user.password);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}
		}
		if (!!user.googleId && !!googleId) {
			const match = await comparePasswords(googleId, user.googleId);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}
		}

		// Create signed token
		const token = jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		user.password = undefined;
		user.googleId = undefined;
		user.secret = undefined;

		// Response with token and user data
		return res.status(request_codes.SUCCESS).json({
			token,
			user
		});
	} catch (err) {
		return res.status(err.status).json(err.message);
	}
};

const linkAndSignIn = async (req, res) => {
	try {
		const { email, password, googleId } = req.body;
		const user = findUserByEmail(res, email, false);
		let result;

		// If user does not have googleId, update googleId
		if (!user.googleId && googleId) {
			let hashedGoogleId = await hashPassword(googleId)
			result = await User.updateOne({
				userId: user.userId,
				googleId: hashedGoogleId
			});
		}
		// TODO: If user does not have password, update password
		if (!user.password && password) {
			let hashedPassword = await hashPassword(password)
			result = await User.updateOne({
				userId: user.userId,
				password: hashedPassword
			});
		}

		if (result.matchedCount > 0) {
			console.log(`User with with ID ${user.userId} linked successfully`);
			// Create signed token
			const token = jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});

			return res.status(request_codes.SUCCESS).json({
				token,
				user
			});
		} else {
			return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
		}
	}
	catch (err) {
		return res.status(err.status).json(err.message);
	}
}

module.exports = {
	checkUserExists,
	signup,
	linkAndSignIn,
	signin
}


// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   // find user by email
//   const user = await User.findOne({ email });
//   console.log("USER ===> ", user);
//   if (!user) {
//     return res.json({ error: "User not found" });
//   }
//   // generate code
//   const resetCode = nanoid(5).toUpperCase();
//   // save to db
//   user.resetCode = resetCode;
//   user.save();
//   // prepare email
//   const emailData = {
//     from: process.env.EMAIL_FROM,
//     to: user.email,
//     subject: "Password reset code",
//     html: "<h1>Your password  reset code is: {resetCode}</h1>"
//   };
//   // send email
//   try {
//     const data = await sgMail.send(emailData);
//     console.log(data);
//     res.json({ ok: true });
//   } catch (err) {
//     console.log(err);
//     res.json({ ok: false });
//   }
// };
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, password, resetCode } = req.body;
//     // find user based on email and resetCode
//     const user = await User.findOne({ email, resetCode });
//     // if user not found
//     if (!user) {
//       return res.json({ error: "Email or reset code is invalid" });
//     }
//     // if password is short
//     if (!password || password.length < 6) {
//       return res.json({
//         error: "Password is required and should be 6 characters long",
//       });
//     }
//     // hash password
//     const hashedPassword = await hashPassword(password);
//     user.password = hashedPassword;
//     user.resetCode = "";
//     user.save();
//     return res.json({ ok: true });
//   } catch (err) {
//     console.log(err);
//   }
// };



// Server


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

// Middleware
const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
	.then(() => console.log("DB Connected"))
	.catch((err) => console.log("DB connection error: ", err))

// Routes
app.use('/api', authRoutes);
app.use('/users', userRoutes);
app.use('/send_email', sendEmailRoutes);

// Catch and handle errors that occur during request processing
// app.use((err, req, res, next) => {
// 	console.error(err.stack);
// 	res.status(500).send('Internal Server Error');
// });

// mongoose.connection.on('error', (err) => {
// 	console.error('Mongoose connection error:', err);
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// const server = 
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// process.on('SIGINT', () => {
// 	mongoose.disconnect();
// 	server.close(() => {
// 		console.log('Server stopped');
// 		process.exit(0);
// 	});
// });


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

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());


// Check if the user is authenticated

// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/');
// };

// // TODO: Implement Example protected route
// app.get('/protected', isAuthenticated, (req, res) => {
//   res.send('This is a protected route.');
// });

// // Google Sign-In Route

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('/');
//   });