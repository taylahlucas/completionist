const bcrypt = require('bcrypt');

async function comparePasswords(enteredPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);

    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = comparePasswords;