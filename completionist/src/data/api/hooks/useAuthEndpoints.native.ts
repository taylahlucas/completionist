import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import {
  checkUserExistsUrl,
  linkAndSignInUrl,
  signupUrl,
  signinUrl,
  sendVerificationEmailUrl,
  forgotPwUrl,
} from '../../urls';
import {
  AuthEndpointsReturnType,
  CredentialsExistProps,
  SignUpProps,
  SignInProps,
  SendEmailProps,
  ForgotPwProps,
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import { REFRESH_CACHE_KEY, requestCodes, UserResponse } from '@utils/index';
import { saveToCache } from './useCache.native';
import useAuthInterceptor from './useAuthInterceptor.native';

const useAuthEndpoints = (): AuthEndpointsReturnType => {
  const url =
    Platform.OS === 'ios'
      ? process.env.IOS_LOCAL_URL
      : process.env.ANDROID_LOCAL_URL;
  const { handleAxiosError } = useHandleAxiosError();
  const authInterceptor = useAuthInterceptor();

  const checkUserExists = async (
    email: string,
  ): Promise<CredentialsExistProps> =>
    await authInterceptor
      .post(`${url}/${checkUserExistsUrl}`, {
        email: email.toLocaleLowerCase(),
      })
      .then(response => response.data as CredentialsExistProps)
      .catch(() => ({
        regular: false,
        google: false,
      }));

  const signUp = async ({ data }: SignUpProps): Promise<UserResponse> =>
    await authInterceptor
      .post(`${url}/${signupUrl}`, {
        userId: data.userId ? data.userId : uuid.v4(),
        username: data.username,
        email: data.email.toLocaleLowerCase(),
        googleId: data.googleId ?? '',
        pw: data.pw ?? '',
        signup: {
          verification: false,
          username: !!data.username,
          selectGame: false,
        },
      })
      .then(response => {
        if (response.data.refreshTokenExpiry) {
          saveToCache(response.data.refreshTokenExpiry, REFRESH_CACHE_KEY);
        }
        if (response.data.user) {
          return response.data.user as UserResponse;
        }
        return;
      });

  const signIn = async ({
    email,
    pw,
    googleId,
  }: SignInProps): Promise<UserResponse> =>
    await authInterceptor
      .post(`${url}/${signinUrl}`, {
        email: email.toLocaleLowerCase(),
        pw,
        googleId,
      })
      .then(response => {
        if (response.data.refreshTokenExpiry) {
          saveToCache(response.data.refreshTokenExpiry, REFRESH_CACHE_KEY);
        }
        if (response.data.user) {
          return response.data.user as UserResponse;
        } else {
          handleAxiosError(requestCodes.WRONG_PASSWORD);
          return;
        }
      });

  const linkAndSignIn = async ({
    email,
    pw,
    googleId,
  }: SignInProps): Promise<UserResponse> =>
    await authInterceptor
      .patch(`${url}/${linkAndSignInUrl}`, {
        email: email.toLocaleLowerCase(),
        pw,
        googleId,
      })
      .then(response => {
        if (response.data.refreshTokenExpiry) {
          saveToCache(response.data.refreshTokenExpiry, REFRESH_CACHE_KEY);
        }
        if (response.data.user) {
          return response.data.user as UserResponse;
        }
        // TODO: Log error here?
        return;
      });

  const sendVerificationEmail = async ({
    emailTo,
    subject,
    text,
  }: SendEmailProps): Promise<void> =>
    await authInterceptor.post(`${url}/${sendVerificationEmailUrl}`, {
      to: emailTo,
      subject,
      text,
    });

  const forgotPw = async ({ email, newPw }: ForgotPwProps): Promise<void> =>
    await authInterceptor.patch(`${url}/${forgotPwUrl}`, {
      email: email.toLocaleLowerCase(),
      newPw,
    });

  return {
    checkUserExists,
    signUp,
    signIn,
    linkAndSignIn,
    sendVerificationEmail,
    forgotPw,
  };
};

export default useAuthEndpoints;
