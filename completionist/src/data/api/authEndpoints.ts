import uuid from 'react-native-uuid';
import authInterceptor from './authInterceptor';
import { UserResponse } from '@utils/CustomTypes';
import {
  CredentialsExistProps,
  ForgotPwProps,
  SendEmailProps,
  SignInProps,
  SignUpProps,
} from './EndpointInterfaces.native';
import {
  baseUrl,
  checkUserExistsUrl,
  forgotPwUrl,
  linkAndSignInUrl,
  sendVerificationEmailUrl,
  signinUrl,
  signupUrl,
} from '@data/api/urls';
import { REFRESH_CACHE_KEY, requestCodes } from '@utils/constants';
import { saveToCache } from '@data/cache/localCache';
import { handleAxiosError } from './handleAxiosError';

export const checkUserExists = async (
  email: string,
): Promise<CredentialsExistProps> =>
  await authInterceptor
    .post(`${baseUrl}/${checkUserExistsUrl}`, {
      email: email.toLocaleLowerCase(),
    })
    .then(response => response.data as CredentialsExistProps)
    .catch(() => ({
      regular: false,
      google: false,
    }));

export const signUp = async ({
  data,
  lang,
}: SignUpProps): Promise<UserResponse> =>
  await authInterceptor
    .post(`${baseUrl}/${signupUrl}`, {
      userId: data.userId ? data.userId : uuid.v4(),
      username: data.username,
      email: data.email.toLocaleLowerCase(),
      googleId: data.googleId ?? '',
      pw: data.pw ?? '',
      account: {
        pwAttempts: 0,
      },
      signup: {
        verification: false,
        username: !!data.username,
        selectGame: false,
      },
      lang: lang ?? 'en',
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

export const signIn = async ({
  email,
  pw,
  googleId,
}: SignInProps): Promise<UserResponse> =>
  await authInterceptor
    .post(`${baseUrl}/${signinUrl}`, {
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

export const linkAndSignIn = async ({
  email,
  pw,
  googleId,
}: SignInProps): Promise<UserResponse> =>
  await authInterceptor
    .patch(`${baseUrl}/${linkAndSignInUrl}`, {
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

export const sendVerificationEmail = async ({
  emailTo,
  subject,
  text,
}: SendEmailProps): Promise<void> =>
  await authInterceptor.post(`${baseUrl}/${sendVerificationEmailUrl}`, {
    to: emailTo,
    subject,
    text,
  });

export const forgotPw = async ({
  email,
  newPw,
}: ForgotPwProps): Promise<void> =>
  await authInterceptor.patch(`${baseUrl}/${forgotPwUrl}`, {
    email: email.toLocaleLowerCase(),
    newPw,
  });
