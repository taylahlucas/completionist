require('dotenv').config();

function log(type, message, data) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${type}: ${message}`);
    console.log(
      JSON.stringify(
        {
          data,
        },
        null,
        2,
      ),
    );
  }
}

module.exports = log;
