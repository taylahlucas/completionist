import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useEndpoints from '@data/hooks/useEndpoints';
import useKeychain from '@data/hooks/useKeychain.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useCache from '@data/hooks/useCache.native';

const useCreateOrGetUser = () => {
  const navigation = useReactNavigation();
  const { setLoggedIn } = useMainDispatch();
  const { userFormData, isLoggedIn } = useMainState();
  const { createUser, getUserByUserId } = useEndpoints();
  const { getCredentials, storeCredentials, checkIfCredentialsExist } = useKeychain();
  const { saveToCache } = useCache();

  useEffect(() => {
    if (!!userFormData.userId && !isLoggedIn) {
      console.log("Calling getUserByUserId")

      getUserByUserId({ userId: userFormData.userId })
        .then(user => {
          console.log("USER: ", user)
          if (!!user) {
            storeCredentials({
              username: userFormData.name, 
              password: userFormData.userId
            });
            setLoggedIn(true);
            saveToCache(user);
          }
          else {
            createUser({ data: userFormData })
              .then(newUser => {
                console.log("TEST: ", newUser);
                if (!!newUser) {
                  storeCredentials({
                    username: userFormData.name, 
                    password: userFormData.userId
                  });
                  setLoggedIn(true);
                  saveToCache(newUser);
                  navigation.navigate(ScreenEnum.Quests);
                }
              });
          }
        });
    }
  }, [userFormData])
};

export default useCreateOrGetUser;