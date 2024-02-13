import { Alert, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { SteamAchievement, User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, StringResponse, UserResponse } from '@utils/CustomTypes';
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
import { requestCodes } from '@utils/constants';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { saveUserData, setAuthHeaders, storeUserCredentials, getAuthToken } = useAuth();
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
			storeUserCredentials(data.userId, response.data.token);
			saveUserData(response.data.user);
			return response.data.user as User;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
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
			if (!!response.data.user) {
				storeUserCredentials(response.data.user.userId, response.data.token);
				saveUserData(response.data.user)
				return response.data.user as User;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
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
				if (!!response.data) {
					storeUserCredentials(response.data.userId, response.data.token);
					saveUserData(response.data);
					return response.data as User;
				}
			}
			catch (error: AxiosErrorResponse) {
				handleAxiosError(error.response.status);
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
				handleAxiosError(error.response.status);
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
				handleAxiosError(error.response.status);
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
			);
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};
	
	const getSteamUserById = async (appId: string, steamId: string): Promise<StringResponse> => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0001/?appid=${appId}&key=${config.steamApiToken}&steamid=${steamId}`
			);

			if (!!response?.data?.playerstats?.steamID) {
				return response?.data?.playerstats?.steamID;
			}
			else {
				Alert.alert('Steam ID not found.');
			}
		}
		catch (error: AxiosErrorResponse) {
			if (error?.response?.status === requestCodes.NO_PERMISSION) {
				Alert.alert('Permission Denied', 'Please allow access through your Steam settings.');
			}
		}
	};

	const getSteamPlayerAchievements = async (appId: string, steamId: string) => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0001/?appid=${appId}&key=${config.steamApiToken}&steamid=${steamId}`
			);

			if (!!response?.data?.playerstats) {
				return response?.data?.playerstats;
			}
		}
		catch (error: AxiosErrorResponse) {
			if (error?.response?.status === requestCodes.NO_PERMISSION) {
				Alert.alert('Permission Denied', 'Please allow access through your Steam settings.');
			}
			else {
				Alert.alert('Error', 'Could not get achievements for this game.');
			}
		}
	};

	const getSteamAchievementsById = async (appId: string): Promise<(SteamAchievement[] | void)> => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${config.steamApiToken}&appid=${appId}&l=english&format=json`
			);

			return response.data.game.availableGameStats.achievements as SteamAchievement[];
		}
		catch (error: AxiosErrorResponse) {
			console.log('Could not get achievements for this game.');
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
		getSteamPlayerAchievements,
		getSteamAchievementsById
	};
};

export default useEndpoints;