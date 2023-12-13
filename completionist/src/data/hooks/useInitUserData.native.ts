import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useEndpoints from './useEndpoints';
import useKeychain from './useKeychain.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useCache from './useCache.native';
import useSaveUserData from './useSaveUserData.native';
import { CredentialsResponse } from '@utils/CustomTypes';

const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { isLoggedIn, user, appState } = useMainState();
  const { getCredentials } = useKeychain();
  const { updateUserData } = useEndpoints();
  const { fetchDataFromCache } = useCache();
  const { saveUserData, removeUserData } = useSaveUserData();

  // TODO: createUser not creating with data 
  useEffect(() => {
    // TODO: Move this to custom function?
    getCredentials()
      .then((credentials: CredentialsResponse) => {
        if (!!credentials?.password) {
          fetchDataFromCache(credentials.password)
            .then(cachedData => {
              if (!!cachedData) {
                saveUserData(cachedData);
              }
            });
        }
      });
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    switch (appState) {
      case 'active':
        if (!isLoggedIn || !!user.userId) {
          getCredentials()
            .then((credentials: CredentialsResponse) => {
              if (!!credentials) {
                fetchDataFromCache(credentials.password)
                  .then(cachedData => {
                    if (!!cachedData) {
                      saveUserData(cachedData);
                    }
                  });
              }
            })
        }
        return;
      case 'inactive': 
        if (isLoggedIn && !!user.userId) {
          saveUserData(user);
          updateUserData({
            userId: user.userId,
            skyrimData: user.data?.skyrim
          });
        }
        return;
    }
  }, [appState]);
};

export default useInitUserData;