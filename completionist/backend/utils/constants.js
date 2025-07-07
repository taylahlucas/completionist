const loggerType = {
  request: '🔁 [REQUEST]',
  success: '✅ [SUCCESS]',
  error: '🔴 [ERROR]',
};

const response_code = {
  SUCCESS: 200,
  FAILURE: 205,
  UNAUTHORIZED: 405,
  NOT_FOUND: 500,
  EMAIL_TAKEN: 600,
  EMAIL_NOT_FOUND: 602,
  NO_USER_FOUND: 605,
  WRONG_PASSWORD: 610,
};

const response_message = {
  UNAUTHORIZED: 'Unauthorized token.',
  EMAIL_TAKEN: 'Email already exists.',
  NO_USER_FOUND: 'No user found.',
  WRONG_PASSWORD: 'Wrong password.',
  WRONG_GOOGLE_ID: 'Wrong googleId.',
};

const apiNames = {
  authToken: 'Authentication Token',
  checkUserExists: 'Check User Exists',
  signup: 'Sign up',
  signin: 'Sign in',
  linkAndSignIn: 'Link and Sign In',
  forgotPw: 'Forgot Password',
  getDataForGame: 'Get Data For Game',
  createPayment: 'Create Payment',
  sendVerificationEmail: 'Send Verification Email',
  sendEmail: 'Send Email',
  getSteamProfile: 'Get Steam Profile',
  getSteamAchievements: 'Get Steam Achievements',
  getUserByUserId: 'Get User By User Id',
  updateUser: 'Update User',
  changePassword: 'Change Password',
  deleteUser: 'Delete User',
};

module.exports = {
  loggerType,
  response_code,
  response_message,
  apiNames,
};
