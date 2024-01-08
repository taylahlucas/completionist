import { useEffect } from 'react';
import useEndpoints from '@data/hooks/useEndpoints';
import useKeychain from '@data/hooks/useKeychain.native';
import useCache from '@data/hooks/useCache.native';
import { CredentialsResponse, UserResponse } from '@utils/CustomTypes';
import useSaveUserData from '@data/hooks/useSaveUserData.native';
import useGetLoginMethods from './useGetLoginMethods';
import useLoginState from './useLoginState';

const useCreateOrGetUser = () => {
  const { loginFormData, isLoggedIn } = useLoginState();
  const { createUser, getUserByUserId } = useEndpoints();
  const { getCredentials, storeCredentials } = useKeychain();
  const { signUp } = useGetLoginMethods();
  const { fetchDataFromCache } = useCache();
  const { saveUserData } = useSaveUserData();

  useEffect(() => {
    if (!!loginFormData.userId && !isLoggedIn) {
      getCredentials()
        .then((credentials: CredentialsResponse) => {
          if (!!credentials) {
            fetchDataFromCache(credentials.password)
              .then((cachedData: UserResponse) => {
                if (!!cachedData) {
                  saveUserData(cachedData);
                }
                else {
                  signUp();
                }
              })
          }
          else {
            getUserByUserId({ userId: loginFormData.userId })
              .then(user => {
                if (!!user) {
                  storeCredentials({
                    username: user.name,
                    password: user.userId ?? loginFormData.password ?? ''
                  });
                  saveUserData(user);
                }
                else {
                  createUser({ data: loginFormData })
                    .then((response: UserResponse) => {
                      if (!!response) {
                        storeCredentials({
                          username: response.name,
                          password: response.userId ?? loginFormData.password ?? ''
                        });
                        saveUserData(response);
                      }
                      else {
                        console.log("Error creating user");
                      }
                    });
                }
              })
          }
        })
    }
  }, [loginFormData])
};

export default useCreateOrGetUser;