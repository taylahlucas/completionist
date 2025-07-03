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

module.exports = { response-code, response_message };
