import { useEffect } from 'react';
import { getCredentials } from '../keychain';
import { fetchUserFromCache, saveToCache } from '../localCache';
import { getUserByUserId } from '@data/api/endpoints';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useMainState from '@redux/hooks/use-main-state';
import useMainDispatch from '@redux/hooks/use-main-dispatch';
import { useEditUserData } from '@data/hooks/useEditUserData.native';

export const useLoadUserFromCache = () => {
  const { selectedGame } = useMainState();
  const { setSelectedGameSettings } = useMainDispatch();
  const { setLoggedIn } = useLoginDispatch();
  const { saveUser } = useEditUserData();

  const loadUserFromCache = async () => {
    const credentials = await getCredentials();
    if (credentials) {
      fetchUserFromCache(credentials.username).then(cachedData => {
        if (!cachedData && credentials.username) {
          getUserByUserId({ userId: credentials.username })
            .then(user => {
              if (user) {
                // TODO: Fix save user
                saveUser(user);
                saveToCache(user, user.userId);
                setLoggedIn(true);
                if (!selectedGame && user.gameData) {
                  setSelectedGameSettings(user.gameData[0]?.id);
                }
              }
            })
            .catch(() => {});
        } else {
          if (cachedData) {
            saveUser(cachedData);
            setLoggedIn(true);
            if (!selectedGame && cachedData.gameData) {
              setSelectedGameSettings(cachedData?.gameData[0]?.id);
            }
          }
        }
      });
    }
  };

  return { loadUserFromCache };
};
