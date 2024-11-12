import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
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
	ForgotPwProps
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import useKeychain from '@data/hooks/useKeychain.native';
import { REFRESH_CACHE_KEY, requestCodes } from '@utils/constants';
import useCache from './useCache.native';
import useLogger from '@utils/hooks/useLogger';

const useAuthEndpoints = (): AuthEndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { logSuccessfulApi, logErrorApi } = useLogger();
	const { storeCredentials } = useKeychain();
	const { saveToCache } = useCache();
	const { handleAxiosError } = useHandleAxiosError();

	const checkUserExists = async (email: string): 
	Promise<CredentialsExistProps> => {
		try {
			const response = await axios.post(`${url}/${checkUserExistsUrl}`,
				{
					email: email.toLocaleLowerCase(),
				}
			);
			logSuccessfulApi({
				title: 'Check User Exists',
				data: {
					email
				}
			});
			return response.data as CredentialsExistProps;
		}
		catch(error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Check User Exists',
				data: {
					email,
					error
				}
			});
			return {
				regular: false,
				google: false
			};
		}
	}

	const signUp = async ({ data }: SignUpProps): Promise<UserResponse> => {
		try {
			const response = await axios.post(`${url}/${signupUrl}`,
				{
					userId: data.userId ? data.userId : uuid.v4(),
					username: data.username,
					email: data.email.toLocaleLowerCase(),
					googleId: data.googleId ?? '',
					pw: data.pw ?? ''
				}
			);
			if (!!response.data.token) {
				storeCredentials({
					username: response.data.user.userId,
					password: response.data.token
				});
				saveToCache(response.data.refreshTokenExpiry, REFRESH_CACHE_KEY);
				logSuccessfulApi({
					title: 'Sign Up',
					data: {
						type: data.googleId ? 'Google' : 'Regular',
						userId: response.data.user.userId,
					}
				});
				return response.data.user as User;
			}
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Sign Up',
				data: {
					type: data.googleId ? 'Google' : 'Regular',
					email: data.email,
					error
				}
			});
			handleAxiosError(error.response?.status);
		};
	}

	const signIn = async ({ email, pw, googleId }: SignInProps): Promise<UserResponse> => {
		try {
			const response = await axios.post(`${url}/${signinUrl}`,
				{
					email: email.toLocaleLowerCase(),
					pw,
					googleId
				}
			);
			const responseData = response?.data;
			if (responseData && responseData.user && responseData.token) {
				storeCredentials({
					username: responseData.user?.userId,
					password: responseData.token
				});
				saveToCache(response.data.refreshTokenExpiry, REFRESH_CACHE_KEY);
				logSuccessfulApi({
					title: 'Sign In',
					data: {
						type: googleId ? 'Google' : 'Regular',
						userId: responseData.user?.userId,
						email
					}
				});
				return responseData.user as UserResponse;
			}
			else {
				handleAxiosError(requestCodes.WRONG_PASSWORD);
				return;
			}
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Sign In',
				data: {
					type: googleId ? 'Google' : 'Regular',
					email,
					error
				}
			});
			handleAxiosError(error.response?.status);
		}
	};

	const linkAndSignIn = async ({ email, pw, googleId }: SignInProps): Promise<UserResponse> => {
		try {
			const response = await axios.patch(`${url}/${linkAndSignInUrl}`,
				{
					email: email.toLocaleLowerCase(),
					pw,
					googleId
				}
			);
			if (!!response.data.user && !!response.data.token) {
				storeCredentials({
					username: response.data.user.userId,
					password: response.data.token
				});
				saveToCache(response.data.refreshTokenExpiry, REFRESH_CACHE_KEY);
				logSuccessfulApi({
					title: 'Link And Sign In',
					data: {
						type: googleId ? 'Google' : 'Regular',
						userId: response.data.user.userId,
						email
					}
				});
				return response.data.user as UserResponse;
			}
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Link And Sign In',
				data: {
					type: googleId ? 'Google' : 'Regular',
					email,
					error
				}
			});
			handleAxiosError(error.response?.status);
		}
	}

	const sendVerificationEmail = async ({ emailTo, subject, text }: SendEmailProps): Promise<void> => {		
		try {
			await axios.post(
				`${url}/${sendVerificationEmailUrl}`,
				{
					to: emailTo,
					subject,
					text
				}
			);
			logSuccessfulApi({
				title: 'Send Verification Email',
				data: {
					emailTo
				}
			});
			return;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Send Verification Email',
				data: {
					emailTo,
					error
				}
			});
			handleAxiosError(error.response?.status);
		}
	};

	const forgotPw = async ({ email, newPw }: ForgotPwProps): Promise<void> => {
		try {
			await axios.patch(
				`${url}/${forgotPwUrl}`,
				{
					email: email.toLocaleLowerCase(),
					newPw
				}
			)
			logSuccessfulApi({
				title: 'Forgot Password',
				data: {
					email
				}
			});
			return;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Forgot Password',
				data: {
					email,
					error
				}
			});
			handleAxiosError(error.response?.status);
		}
	};

	return {
		checkUserExists,
		signUp,
		signIn,
		linkAndSignIn,
		sendVerificationEmail,
		forgotPw
	}
};

export default useAuthEndpoints;