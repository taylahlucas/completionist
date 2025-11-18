import { getCredentials } from '../keychain';
import { fetchUserFromCache } from '../local-cache';
import { getUserByUserId, useVerifyUser } from '@data/index';

export const useLoadUserFromCache = () => {
  const handleUserVerification = useVerifyUser();

  const loadUserFromCache = async () => {
    const credentials = await getCredentials();
    if (credentials) {
      fetchUserFromCache(credentials.username).then(cachedData => {
        if (!cachedData && credentials.username) {
          // Load user and store in cache
          getUserByUserId({ userId: credentials.username })
            .then(user => {
              if (user) {
                handleUserVerification(user);
              }
            })
            .catch(() => {});
        } else {
          // Get cached user data
          if (cachedData) {
            handleUserVerification(cachedData);
          }
        }
      });
    }
  };

  return loadUserFromCache;
};
