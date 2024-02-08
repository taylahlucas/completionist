import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import { signupUrl, signinUrl, getUserByUserIdUrl, updateUserDataUrl, sendEmailUrl } from '../../urls';
import useKeychain from '../../hooks/useKeychain.native';
import {
	CreateUserProps,
	SignInProps,
	GetUserByUserIdProps,
	UpdateUserDataProps,
	EmailProps,
	EndpointsReturnType
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { setAuthHeaders, setCredentials, authToken } = useAuth();
	const { handleAxiosError } = useHandleAxiosError();

	// TODO: Work out a better way to handle authToken
	// TODO: Test if authToken is doing anything currently (in terms of security)
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
			setCredentials(data.userId, response.data.token);
			return response.data.user as User;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error);
			return;
		};
	}

	const signIn = async ({ email, password }: SignInProps): Promise<UserResponse> => {
		if (!!authToken) {
			try {
				const response = await axios.post(`${url}/${signinUrl}`,
					{
						email: email,
						password: password
					},
					setAuthHeaders(authToken)
				);
				setCredentials(response.data.user.userId, response.data.token);
				return response.data.user as User;
			}
			catch (error: AxiosErrorResponse) {
				handleAxiosError(error);
				return;
			}
		}
	};


	const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		if (!!authToken) {
			try {
				const response = await axios.get(
					`${url}/${getUserByUserIdUrl}/${userId}`,
					setAuthHeaders(authToken)
				);
				return response.data as User;
			}
			catch (error: AxiosErrorResponse) {
				handleAxiosError(error);
				return;
			}
		}
	};

	const updateUserData = async ({ userId, subscription, settings, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<UserResponse> => {
		if (!!authToken) {
			try {
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
					setAuthHeaders(authToken)
				);
			}
			catch (error: AxiosErrorResponse) {
				handleAxiosError(error);
			}
		}
	};

	const sendEmail = async ({ from, subject, text }: EmailProps): Promise<UserResponse> => {
		try {
			await axios.post(
				`${url}/${sendEmailUrl}`,
				{
					from: from,
					subject: subject,
					text: text
				},
				setAuthHeaders('')
			)
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error);
		}
	};

	return { signIn, signUp, getUserByUserId, updateUserData, sendEmail };
};

export default useEndpoints;