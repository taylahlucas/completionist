import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import useEndpoints from '@data/hooks/useEndpoints';
import useKeychain from '@data/hooks/useKeychain.native';
import useCache from '@data/hooks/useCache.native';
import { CredentialsResponse, UserResponse } from '@utils/CustomTypes';
import useSaveUserData from '@data/hooks/useSaveUserData.native';

const useCreateOrGetUser = () => {
  const { userFormData, isLoggedIn } = useMainState();
  const { createUser, getUserByUserId } = useEndpoints();
  const { getCredentials } = useKeychain();
  const { fetchDataFromCache } = useCache();
  const { saveUserData } = useSaveUserData();

  useEffect(() => {
    if (!!userFormData.userId && !isLoggedIn) {
      getCredentials()
        .then((credentials: CredentialsResponse) => {
          if (!!credentials) {
            fetchDataFromCache(credentials.password)
              .then((cachedData: UserResponse) => {
                if (!!cachedData) {
                  saveUserData(cachedData);
                }
                else {
                  createUser({ data: userFormData });
                }
              })
          }
          else {
            getUserByUserId({ userId: userFormData.userId })
              .then(user => {
                if (!!user) {
                  saveUserData(user);
                }
                else {
                  createUser({ data: userFormData });
                }
              })
          }
        })
    }
  }, [userFormData])
};

export default useCreateOrGetUser;