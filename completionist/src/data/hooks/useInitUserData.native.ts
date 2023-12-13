import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useEndpoints from './useEndpoints';
import useKeychain from './useKeychain.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useCache from './useCache.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

const useInitUserData = () => {
  const appState = useRef(AppState.currentState);
  const navigation = useReactNavigation();
  const { setUser, setLoggedIn } = useMainDispatch();
  const { isLoggedIn } = useMainState();
  const { getCredentials, checkIfCredentialsExist } = useKeychain();
  const { getUserByUserId, updateUserData } = useEndpoints();
  const { fetchData, saveToCache, clearCache } = useCache();
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // App opening, read data
      if (nextAppState === 'active') {
        getCredentials()
          .then((response) => {
            if (!!response?.password) {
              const exists = checkIfCredentialsExist(response?.password);
              // Get user if user credentials exist
              if (exists) {
                // Get user from cache
                // TODO: TypeError: Cannot read property 'skyrim' of undefined
                fetchData()
                  .then(userData => {
                    if (!!userData) {
                      setUser(userData);
                      saveToCache(userData);
                      setLoggedIn(true);
                      navigation.navigate(ScreenEnum.Quests);
                    }
                    else {
                      getUserByUserId({ userId: response?.password })
                        .then((user: (User | null)) => {
                          if (!!user) {
                            setUser(user);
                            saveToCache(user);
                            setLoggedIn(true);
                            navigation.navigate(ScreenEnum.Quests);
                          }
                        });
                    }
                  });
              }
            }
          })
      }
      // App closing, upload data
      else if (nextAppState === 'inactive' && isLoggedIn) {
        // console.log("UPDATING USER: ", userFormData.userId)
        // const quests: Item[] = completedQuests.map(id => ({ id, isComplete: true }));
        // const collectables: Item[] = completedCollectableIds.map(id => ({ id, isComplete: true }));
        // const locations: Item[] = completedLocations.map(id => ({ id, isComplete: true }));
        // const miscellaneous: Item[] = completedMiscItems.map(id => ({ id, isComplete: true }));

        // updateUserData({
        //   userId: userFormData.userId,
        //   skyrimData: {
        //     quests: quests,
        //     collectables: collectables,
        //     locations: locations,
        //     miscellaneous: miscellaneous
        //   }
        // });
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useInitUserData;