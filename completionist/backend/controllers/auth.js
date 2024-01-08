require("dotenv").config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hashPassword = require("../scripts/hash_password");
const comparePasswords = require("../scripts/compare_passwords");

const signup = async (req, res) => {
  try {
    const { 
      userId,
      name,
      email,
      password,
      userAvatar,
      subscription
     } = req.body;
    if (!userId) {
      return res.json({
        error: "userId is required",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // Hash password
    let hashedPassword = '';
    if (password) {
      hashedPassword = await hashPassword(password)
    }

    try {
      const user = await new User({
        userId,
        name,
        email,
        password: hashedPassword,
        userAvatar,
        subscription
      }).save();
      // Create signed token
      const token = jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password, ...rest } = user._doc;

      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    const match = await comparePasswords(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // Create signed token
    const token = jwt.sign({ _id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
    console.log('Signed in successfully');
  } catch (err) {
    console.log('Error signing in: ', err)
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