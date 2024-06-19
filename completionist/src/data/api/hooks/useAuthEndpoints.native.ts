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
import { requestCodes } from '@utils/constants';

const useAuthEndpoints = (): AuthEndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { storeCredentials } = useKeychain();
	const { handleAxiosError } = useHandleAxiosError();

	const test = async () => {
		try {
			const response = await axios.patch(`${url}/test/addUser`);
			console.log("TEST response: ", response);
			return;
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error with test ", JSON.stringify(error, null, 2));
			return;
		}
	};

	const checkUserExists = async (email: string): 
	Promise<CredentialsExistProps> => {
		console.log("checkUserExists");
		try {
			const response = await axios.post(`${url}/${checkUserExistsUrl}`,
				{
					email: email.toLocaleLowerCase(),
				}
			);
			return response.data as CredentialsExistProps;
		}
		catch(error: AxiosErrorResponse) {
			return {
				regular: false,
				google: false
			};
		}
	}

	const signUp = async ({ data }: SignUpProps): Promise<UserResponse> => {
		console.log("signUp");
		try {
			const response = await axios.post(`${url}/${signupUrl}`,
				{
					userId: data.userId ? data.userId : uuid.v4(),
					name: data.name,
					email: data.email.toLocaleLowerCase(),
					googleId: data.googleId ?? '',
					pw: data.pw ?? '',
					userAvatar: data.userAvatar
				}
			);
			if (!!response.data.token) {
				storeCredentials({
					username: response.data.user.userId,
					password: response.data.token
				});
				return response.data.user as User;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		};
	}

	const signIn = async ({ email, pw, googleId }: SignInProps): Promise<UserResponse> => {
		console.log("signIn");
		try {
			const response = await axios.post(`${url}/${signinUrl}`,
				{
					email: email.toLocaleLowerCase(),
					pw,
					googleId
				}
			);
			const responseData = response?.data;
			if (responseData && !!responseData.user && !!responseData.token) {
				const credentialsResponse = {
					username: responseData.user?.userId,
					password: responseData.token
				}
				storeCredentials(credentialsResponse);
				return responseData.user as UserResponse;
			}
			else {
				handleAxiosError(requestCodes.WRONG_PASSWORD);
				return;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const linkAndSignIn = async ({ email, pw, googleId }: SignInProps): Promise<UserResponse> => {
		console.log("linkAndSignIn");
		try {
			const response = await axios.patch(`${url}/${linkAndSignInUrl}`,
				{
					email: email.toLocaleLowerCase(),
					pw,
					googleId
				}
			);
			if (!!response.data.user && !!response.data.token) {
				const credentialsResponse = {
					username: response.data.user.userId,
					password: response.data.token
				}
				storeCredentials(credentialsResponse);
				return response.data.user as UserResponse;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	}

	const sendVerificationEmail = async ({ emailTo, subject, text }: SendEmailProps): Promise<void> => {		
		console.log("sendVerificationEmail");
		try {
			await axios.post(
				`${url}/${sendVerificationEmailUrl}`,
				{
					to: emailTo,
					subject,
					text
				}
			);
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
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
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	return {
		test,
		checkUserExists,
		signUp,
		signIn,
		linkAndSignIn,
		sendVerificationEmail,
		forgotPw
	}
};

export default useAuthEndpoints;