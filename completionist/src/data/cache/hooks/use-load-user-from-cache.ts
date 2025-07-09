import { getCredentials } from '../keychain';
import { fetchUserFromCache, saveToCache } from '../local-cache';
import { getUserByUserId } from '@data/index';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useEditUserData } from '@data/hooks/use-edit-user-data';
import { useLoginDispatch } from '@features/login/provider';

export const useLoadUserFromCache = () => {
  const { selectedGameData } = useMainState();
  const { setSelectedGameDataSettings } = useMainDispatch();
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
                if (!selectedGameData && user.gameData) {
                  setSelectedGameDataSettings(user.gameData[0]?.id);
                }
              }
            })
            .catch(() => {});
        } else {
          if (cachedData) {
            saveUser(cachedData);
            setLoggedIn(true);
            if (!selectedGameData && cachedData.gameData) {
              setSelectedGameDataSettings(cachedData?.gameData[0]?.id);
            }
          }
        }
      });
    }
  };

  return { loadUserFromCache };
};
