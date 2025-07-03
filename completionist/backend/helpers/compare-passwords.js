const bcrypt = require('bcrypt');

async function comparePws(enteredPw, hashedPw) {
  try {
    const isMatch = await bcrypt.compare(enteredPw, hashedPw);

    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = comparePws;