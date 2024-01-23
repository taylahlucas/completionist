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
  const { getUserByUserId } = useEndpoints();
  const { getCredentials, storeCredentials } = useKeychain();
  const { createUser } = useGetLoginMethods();
  const { fetchDataFromCache } = useCache();
  const { saveUserAndLogin } = useSaveUserData();

  // useEffect(() => {
  //   if (!!loginFormData.userId && !isLoggedIn) {
  //     console.log("useCreateOrGetUser GETTING CREDENTIALS")
  //     getCredentials()
  //       .then((credentials: CredentialsResponse) => {
  //         // If credentials exist in the keychain, fetch data from the cache
  //         if (!!credentials) {
  //           fetchDataFromCache(credentials.password)
  //             .then((cachedData: UserResponse) => {
  //               if (!!cachedData) {
  //                 saveUserAndLogin(cachedData);
  //               }
  //             })
  //         }
  //         else {
  //           // If no credentials exist, get user by id or create user and store in keychain and cache
  //           getUserByUserId({ userId: loginFormData.userId })
  //             .then(user => {
  //               if (!!user) {
  //                 storeCredentials({
  //                   username: user.name,
  //                   password: user.userId ?? loginFormData.password ?? ''
  //                 });
  //                 saveUserAndLogin(user);
  //               }
  //               else {
  //                 createUser();
  //               }
  //             })
  //         }
  //       })
  //   }
  // }, [loginFormData])
};

export default useCreateOrGetUser;