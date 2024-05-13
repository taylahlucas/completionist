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
} from '../../urls';
import {
	AuthEndpointsReturnType,
	CredentialsExistProps,
	SignUpProps,
	SignInProps,
	SendEmailProps,
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import useKeychain from '@data/hooks/useKeychain.native';

const useAuthEndpoints = (): AuthEndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { storeCredentials } = useKeychain();
	const { handleAxiosError } = useHandleAxiosError();

	const checkUserExists = async (email: string): Promise<CredentialsExistProps> => {
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
		try {
			const response = await axios.post(`${url}/${signupUrl}`,
				{
					userId: data.userId ? data.userId : uuid.v4(),
					name: data.name,
					email: data.email.toLocaleLowerCase(),
					googleId: data.googleId ?? '',
					password: data.password ?? '',
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

	const signIn = async ({ email, password, googleId }: SignInProps): Promise<UserResponse> => {
		try {
			const response = await axios.post(`${url}/${signinUrl}`,
				{
					email: email.toLocaleLowerCase(),
					password: password,
					googleId: googleId
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
	};

	const linkAndSignIn = async ({ email, password, googleId }: SignInProps): Promise<UserResponse> => {
		try {
			const response = await axios.patch(`${url}/${linkAndSignInUrl}`,
				{
					email: email.toLocaleLowerCase(),
					password: password,
					googleId: googleId
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
		try {
			await axios.post(
				`${url}/${sendVerificationEmailUrl}`,
				{
					to: emailTo,
					subject: subject,
					text: text
				}
			);
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	return {
		checkUserExists,
		signUp,
		signIn,
		linkAndSignIn,
		sendVerificationEmail,
	}
};

export default useAuthEndpoints;