import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useEndpoints from './useEndpoints';
import useKeychain from './useKeychain.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useCache from './useCache.native';

const useInitUserData = () => {
  const appState = useRef(AppState.currentState);
  const { setUser } = useMainDispatch();
  const { isLoggedIn } = useMainState();
  const { getCredentials, checkIfCredentialsExist } = useKeychain();
  const { getUserByUserId, updateUserData } = useEndpoints();
  const { fetchData, saveToCache } = useCache();
  
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
                fetchData()
                  .then(userData => {
                    if (!!userData) {
                      console.log("USER DATA: ", userData)
                      setUser(userData);
                    }
                  });
                // getUserByUserId({ userId: response?.password })
                //   .then((user: (User | null)) => {
                //     console.log("1-USER: ", user)
                //     saveToCache(user);
                //   });
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