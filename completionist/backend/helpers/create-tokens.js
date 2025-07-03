require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const createSignedToken = () => jwt.sign({ _id: uuidv4() }, process.env.JWT_SECRET, {
	expiresIn: "4h",
});

const createRefreshToken = () => jwt.sign({ _id: uuidv4() }, process.env.JWT_REFRESH_SECRET, {
	expiresIn: "90d",
});

module.exports = {
	createSignedToken,
	createRefreshToken
}
