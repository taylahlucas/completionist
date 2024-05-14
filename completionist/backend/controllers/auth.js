require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPassword = require('../helpers/hash_password');
const comparePasswords = require('../helpers/compare_passwords');
const request_codes = require('../helpers/request_codes');

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
	try {
		const { email, password, googleId } = req.body;
		const user = await User.findOne({ email }).limit(10);

		if (!user) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

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

const forgotPw = async (req, res) => {
	try {
		const { email, newPw } = req.body;
		const user = await User.findOne({ email }).limit(10);

		if (!user) {
			return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
		}

		// Hash new password
		let hashedPassword = '';
		if (newPw) {
			hashedPassword = await hashPassword(newPw);
		}

		await User.findOneAndUpdate(
			{ 'userId': user.userId },
			{
				password: hashedPassword
			}
		);
		return res.status(request_codes.SUCCESS).json({ ok: true });
	}
	catch (err) {
		console.log("ERror: ", err.message)
		return res.status(err.status).json(err.message);
	}
};

module.exports = {
	checkUserExists,
	signup,
	linkAndSignIn,
	signin,
	forgotPw
}