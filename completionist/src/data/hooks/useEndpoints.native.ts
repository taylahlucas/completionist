import { Alert, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import { signupUrl, signinUrl, getUserByUserIdUrl, updateUserDataUrl, sendEmailUrl } from '../urls';
import { requestCodes } from '@utils/constants';
import useKeychain from './useKeychain.native';
import useSetAuthHeaders from './useSetAuthHeaders.native';
import { 
	CreateUserProps,
	SignInProps,
	GetUserByUserIdProps,
	UpdateUserDataProps,
	EmailProps,
	EndpointsReturnType 
} from '@data/EndpointInterfaces.native';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios' ? process.env.IOS_LOCAL_URL : process.env.ANDROID_LOCAL_URL;
	const { getCredentials, storeCredentials } = useKeychain();
	const { setAuthHeaders } = useSetAuthHeaders();

	// TODO: Refactor to use AuthenticatedUser
	const signIn = async ({ email, password }: SignInProps): Promise<UserResponse> => {
		try {
			const token = getCredentials();
			if (!!token) {
				const response = await axios.post(`${url}/${signinUrl}`,
					{
						email: email,
						password: password
					},
					setAuthHeaders(token)
				)
				if (!!response.data.user.userId && !!response.data.token) {
					storeCredentials({
						username: response.data.user.userId,
						password: response.data.token
					});
					return response.data.user as User;
				}
			}
			console.log("Could not get token")
			return null;
		}
		catch (error: AxiosErrorResponse) {
			switch (error.request.status) {
				case requestCodes.WRONG_PASSWORD:
					Alert.alert('Error', 'Incorrect password. Please try again.');
					return null;
				default:
					Alert.alert('User not found', 'Incorrect email or password.\nPlease try again.');
					return null;
			}
		}
	};

	const signUp = async ({ data }: CreateUserProps): Promise<UserResponse> => {
		try {
			const response = await axios.post(`${url}/${signupUrl}`,
				{
					userId: data.userId ? data.userId : uuid.v4(),
					name: data.name,
					email: data.email,
					password: data.password ?? '',
					userAvatar: data.userAvatar
				}
			);
			if (!!response.data.token) {
				storeCredentials({
					username: data.userId,
					password: response.data.token
				});
				return response.data.user as User;
			}
			return null;
		}
		catch (error: AxiosErrorResponse) {
			switch (error.request.status) {
				case requestCodes.EMAIL_TAKEN:
					Alert.alert('Error', 'Email already exists.');
					return null;
				default:
					Alert.alert('Error', 'Internal server error. Please refresh the app');
					return null;
			}
		};
	}

	const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		try {
			const token = getCredentials();
			if (!!token) {
				const response = await axios.get(
					`${url}/${getUserByUserIdUrl}/${userId}`,
					setAuthHeaders(token)
				);
				return response.data as User;
			}
			console.log("Could not get token")
			return null;
		}
		catch (error: AxiosErrorResponse) {
			switch (error.request.status) {
				case requestCodes.NOT_FOUND:
					return null;
				default:
					Alert.alert('Error', 'Internal server error. Please refresh the app');
					return null;
			}
		}
	};

	const updateUserData = async ({ userId, subscription, settings, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<void> => {
		try {
			const token = getCredentials();
			if (!!token) {
				await axios.post(
					`${url}/${updateUserDataUrl}`,
					{
						userId: userId,
						subscription: subscription,
						settings: settings,
						// TODO: Change this
						skyrimData: skyrimData,
						fallout4Data: fallout4Data
					},
					setAuthHeaders(token)
				)
			}
			console.log("Could not get token");
		}
		catch (error: AxiosErrorResponse) {
			Alert.alert('Something went wrong.', error.message);
		}
	};

	const sendEmail = async ({ from, subject, text }: EmailProps): Promise<void> => {
		try {
			const token = getCredentials();
			if (!!token) {
				await axios.post(
					`${url}/${sendEmailUrl}`,
					{
						from: from,
						subject: subject,
						text: text
					},
					setAuthHeaders(token)
				)
			}
			console.log("Could not get token");
		}
		catch (error: AxiosErrorResponse) {
			Alert.alert('Something went wrong.', error.message);
		}
	}

	return { signIn, signUp, getUserByUserId, updateUserData, sendEmail };
};

export default useEndpoints;