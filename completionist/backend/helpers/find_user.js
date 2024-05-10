const request_codes = require('../helpers/request_codes');

const findUserByEmail = async (res, email) => {
	try {
		const existingUser = await User.findOne({ email }).limit(10);
		return existingUser
	}
	catch (err) {
		// Return null if signing up since we don't want to throw an error here
		return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
	}
}

const findUserById = async (res, userId) => {
	try {
		const existingUser = await User.findOne({ userId }).limit(10);
		return existingUser
	}
	catch (err) {
		return res.status(request_codes.NO_USER_FOUND).json({ error: "No user found." });
	}
}

module.exports = {
	findUserByEmail,
	findUserById
};