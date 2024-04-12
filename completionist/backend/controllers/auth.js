require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPassword = require('../helpers/hash_password');
const comparePasswords = require('../helpers/compare_passwords');
const request_codes = require('../helpers/request_codes');

// https://medium.com/@xiaominghu19922/authentication-and-authorization-with-nodejs-react-and-typescript-part-2-ae9d320e4f74

const signup = async (req, res) => {
  try {
    const { 
      userId,
      name,
      email,
      password: userPassword,
      userAvatar
     } = req.body;

    if (!userId) {
      res.json({ error: "userId is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(request_codes.EMAIL_TAKEN).json({ error: 'Email already exists.' });
    }

    // Hash password if password is provided
    let hashedPassword = '';
    if (userPassword) {
      hashedPassword = await hashPassword(userPassword)
    }

    // Create new user
    const user = await new User({
      userId,
      name,
      email,
      password: hashedPassword,
      userAvatar
    }).save();

    // Create signed token
    const token = jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove password from the user object
    const { password, ...rest } = user._doc;

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
    const { email, password } = req.body;
    // Check if db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(request_codes.EMAIL_NOT_FOUND).json({
        error: "No user found",
      });
    }

    // If user has password, check if the password matches
    if (!!user.password) {
      const match = await comparePasswords(password, user.password);
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

module.exports = {
  signup,
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