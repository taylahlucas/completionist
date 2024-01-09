const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
  try {
    // Generate a salt
    const saltRounds = 10;  // Adjust the number of salt rounds based on your security requirements
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = hashPassword;