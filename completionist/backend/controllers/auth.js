require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPassword = require('../helpers/hash_password');
const comparePasswords = require('../helpers/compare_passwords');
const request_codes = require('../helpers/request_codes');
const { findUserByEmail } = require('../helpers/find_user');


const createSignedToken = () => jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
	expiresIn: "7d",
});

const checkUserExists = async (req, res) => {
	// Checks if user exists and whether they have a regular or google account set up
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).limit(10);

		return res.status(request_codes.SUCCESS).json({
			regular: user ? !!user.password : false,
			google: user ? !!user.googleId : false,
		});
	}
	catch (err) {
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
		const existingUser = await User.findOne({ email }).limit(10);
		if (existingUser) {
			return res.status(request_codes.EMAIL_TAKEN).json('Email already exists.');
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
		const token = createSignedToken();
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
	console.log("SignIn")
	try {
		const { email, password, googleId } = req.body;
		const user = await findUserByEmail(res, email);
		// const user = await User.findOne({ email }).limit(10);
		// if (!user) {
		// 	return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		// }

		if (user.password && password) {
			const match = await comparePasswords(password, user.password);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}
		}
		if (user.googleId && googleId) {
			const match = await comparePasswords(googleId, user.googleId);
			if (!match) {
				return res.status(request_codes.WRONG_PASSWORD).json({
					error: "Wrong password",
				});
			}
		}

		// Create signed token
		const token = createSignedToken();
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
		const user = await User.findOne({ email }).limit(10);

		if (!user) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		// If user does not have googleId, update googleId
		let result;
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

		const token = createSignedToken();
		return res.status(request_codes.SUCCESS).json({
			token,
			user
		});
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