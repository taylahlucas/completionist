import { Alert, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import { 
	signupUrl, 
	signinUrl, 
	getUserByUserIdUrl, 
	updateUserInfoUrl,
	updateUserDataUrl, 
	sendEmailUrl 
} from '../../urls';
import {
	CreateUserProps,
	SignInProps,
	GetUserByUserIdProps,
	UpdateUserInfoProps,
	UpdateUserDataProps,
	EmailProps,
	EndpointsReturnType
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import useAuth from './useAuth.native';
import config from '@utils/config';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { setAuthHeaders, setCredentials, getAuthToken } = useAuth();
	const { handleAxiosError } = useHandleAxiosError();

	// TODO: Work out a better way to handle authToken
	// TODO: Test if authToken is doing anything currently (in terms of security)
	// TODO: Cache items here
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
		try {
			const response = await axios.post(`${url}/${signinUrl}`,
				{
					email: email,
					password: password
				}
			);
			setCredentials(response.data.user.userId, response.data.token);
			return response.data.user as User;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error);
			return;
		}
	};

	const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		const authToken = await getAuthToken();
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

	const updateUserInfo = async ({ userId, steamId, subscription, settings, userAvatar }: UpdateUserInfoProps): Promise<UserResponse> => {
		const authToken = await getAuthToken();
		if (!!authToken) {
			try {
				await axios.post(
					`${url}/${updateUserInfoUrl}`,
					{
						userId: userId,
						steamId: steamId,
						subscription: subscription,
						settings: settings,
						userAvatar: userAvatar
					},
					setAuthHeaders(authToken)
				);
			}
			catch (error: AxiosErrorResponse) {
				handleAxiosError(error);
			}
		}
	};

	const updateUserData = async ({ userId, data }: UpdateUserDataProps): Promise<UserResponse> => {
		const authToken = await getAuthToken();
		if (!!authToken) {
			try {
				await axios.post(
					`${url}/${updateUserDataUrl}`,
					{
						userId: userId,
						data: data
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
	
	const getSteamUserById = async (appId: string, steamId: string) => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0001/?appid=${appId}&key=${config.steamApiToken}&steamid=${steamId}`
			)
			if (!!response?.data?.playerstats?.steamID) {
				// TODO: Set steamID for user
				return response?.data?.response?.players[0].steamid;
			}
			else {
				Alert.alert('Steam ID not found.');
			}
		}
		catch (error: AxiosErrorResponse) {
			if (error?.response?.status === 403) {
				Alert.alert('Permission Denied', 'Please allow access through your Steam settings.');
				return;
			}
		}
	};

	const getSteamAchievementsById = async (appId: string) => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${config.steamApiToken}&appid=${appId}&l=english&format=json`
			)

			// TODO: Return response
			console.log("RESPONSE: ", response.data.game.availableGameStats.achievements)
		}
		catch (error: AxiosErrorResponse) {
			// handleAxiosError(error);
			console.log("HERE: ", error.response)
		}
	};
	
	return { 
		signIn, 
		signUp, 
		getUserByUserId, 
		updateUserInfo,
		updateUserData,
		sendEmail, 
		getSteamUserById, 
		getSteamAchievementsById 
	};
};

export default useEndpoints;