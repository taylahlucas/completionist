require('dotenv').config();
const checkAuthToken = require('./check-auth');
const cache = require('../cache');
const { response_code, response_message } = require('../utils/constants');
const { createSignedToken, createRefreshToken } = require('./create-tokens');

// Calculate TTL for 60 days in seconds
const ttlInSeconds = 60 * 24 * 60 * 60;

const authWrapper = ({ authFunction, onError }) => {
  return async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        res
          .status(response_code.UNAUTHORIZED)
          .json({ error: response_message.UNAUTHORIZED });
        return false;
      }

      const isAuthorized = await checkAuthToken(
        token,
        process.env.JWT_SECRET,
        res,
      );
      if (isAuthorized) {
        // If token is valid, run api
        return await authFunction(req, res);
      } else {
        // If token is not valid, get refresh token
        const refreshToken = cache.get(process.env.REFRESH_TOKEN_CACHE_KEY);
        if (refreshToken) {
          const isAuthorized = await checkAuthToken(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            res,
          );
          // If refresh token is valid, run api
          if (isAuthorized) {
            const token = createSignedToken();
            return await authFunction(req, res, token);
          } else {
            const token = createSignedToken();
            const newRefreshToken = createRefreshToken();
            cache.set(
              process.env.REFRESH_TOKEN_CACHE_KEY,
              newRefreshToken,
              ttlInSeconds,
            );

            return await authFunction(req, res, token);
          }
        } else {
          return res
            .status(response_code.UNAUTHORIZED)
            .json({ error: response_message.UNAUTHORIZED });
        }
      }
    } catch (err) {
      console.log('authWrapper error: ', err);
      await onError(res, err);
    }
  };
};

module.exports = authWrapper;
