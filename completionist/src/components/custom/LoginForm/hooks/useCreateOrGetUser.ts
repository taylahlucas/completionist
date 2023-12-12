import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useEndpoints from '@data/hooks/useEndpoints';
import useKeychain from '@data/hooks/useKeychain.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

const useCreateOrGetUser = () => {
  const navigation = useReactNavigation();
  const { setLoggedIn } = useMainDispatch();
  const { userFormData, isLoggedIn } = useMainState();
  const { createUser, getUserByUserId } = useEndpoints();
  const { getCredentials, storeCredentials, checkIfCredentialsExist } = useKeychain();

  useEffect(() => {
    if (!!userFormData.userId && !isLoggedIn) {
      // TODO: Fix login/signup flow
        // getCredentials()
        //   .then(credentials => {
        //     if (!!credentials?.password) {
        //       const exists = checkIfCredentialsExist(credentials?.password);
        //       if (!exists) {
        //         storeCredentials({
        //           username: userFormData.name, 
        //           password: userFormData.userId
        //         });
        //       }
        //       setLoggedIn(true);
        //     }
        //   })


      getUserByUserId({ userId: userFormData.userId })
        .then((response) => {
          if (!response) {
            createUser({ data: userFormData })
              .then(() => {
                navigation.navigate(ScreenEnum.Quests);
                setLoggedIn(true);
              });
          }
          else {
            getCredentials()
              .then(credentials => {
                if (!!credentials?.password) {
                  const exists = checkIfCredentialsExist(credentials?.password);
                  if (!exists) {
                    storeCredentials({
                      username: userFormData.name, 
                      password: userFormData.userId
                    });
                  }
                  setLoggedIn(true);
                }
              })
          }
        })
        .catch((error) => {
          console.log("error: ", error)
        }); 
    }
  }, [userFormData])
};

export default useCreateOrGetUser;