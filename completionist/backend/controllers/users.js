const User = require('../models/user');
const request_codes = require('../helpers/request_codes');

const checkAuthToken = (req) => {
	console.log(("HEREEE: ", req.headers))
	const auth_token = req.headers["x-access-token"];

	try {
		if (!auth_token) {
			throw new Error('Unauthorized');
		}

		const decodedUserInfo = jwt.verify(auth_token, process.env.JWT_SECRET);
		console.log("decodedUserInfo: ", decodedUserInfo);
		return decodedUserInfo;
	} catch (error) {
			return res.status(403).json({error: 'Unauthorized'});
		}
}

// export const checkAuthToken = async (req, res, next) => {
//   const auth_token = req.headers["x-access-token"];

//   try {
//     if (!auth_token) {
//       throw new Error('Unauthorized');
//     }

//     const decodedUserInfo = jwt.verify(auth_token, process.env.JWT_SECRET);
//     // Check if user actually exist in db
//     const user = await userRepository.getUserBy({ id: decodedUserInfo.email, matchField: 'email' });
//     if(!user) {
//       throw new Error('Unauthorized');
//     }

//     req.user = {...user.data, ...decodedUserInfo};
//   } catch (error) {
//     return res.status(403).json({error: 'Unauthorized'});
//   }

//   return next();
// };

const getUserByUserId = async (req, res) => {
	try {
		const userId = req.params.userId;

		const user = await User.findOne({ userId: userId });
		if (user) {
			return res.status(request_codes.SUCCESS).json(user);
		} else {
			return res.status(request_codes.EMAIL_NOT_FOUND).json({ error: 'User not found' });
		}
	} catch (error) {
		console.error('Logging Error retrieving user:', error.message);
		return res.status(request_codes.NOT_FOUND).json(error.message);
	}
};

const updateUserInfo = async (req, res) => {
	console.log("updated user info")
	const isAuthorized = checkAuthToken(req);
	try {
		const { userId, steamId, subscription, settings } = req.body;

		const result = await User.updateOne({
			userId: userId,
			steamId: steamId,
			subscription: subscription,
			settings: settings
		});
		if (result.matchedCount > 0) {
			console.log(`User info with ID ${userId} updated successfully`);
			return res.status(request_codes.SUCCESS);
		} else {
			return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
		}
	}
	catch (error) {
		return res.status(error.status).json(error.message);
	}
};

const updateUserData = async (req, res) => {
	console.log("updated user data")
	const isAuthorized = checkAuthToken(req);
	try {
		const { userId, data } = req.body;

		const result = await User.updateOne({
			userId: userId,
			data: {
				skyrim: data.skyrim,
				fallout4: data.fallout4
			}
		});
		if (result.matchedCount > 0) {
			console.log(`User data with ID ${userId} updated successfully`);
			return res.status(request_codes.SUCCESS);
		} else {
			return res.status(request_codes.NOT_FOUND).json({ error: 'User not found' });
		}
	}
	catch (error) {
		return res.status(error.status).json(error.message);
	}
};

module.exports = {
	getUserByUserId,
	updateUserInfo,
	updateUserData
}