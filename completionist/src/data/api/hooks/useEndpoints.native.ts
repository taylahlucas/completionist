import { Alert, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { SteamAchievement, SteamPlayerAchievement, User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, CredentialsResponse, StringResponse, UserResponse } from '@utils/CustomTypes';
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
import useKeychain from '@data/hooks/useKeychain.native';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { setAuthHeaders } = useAuth();
	const { storeCredentials } = useKeychain();
	const { handleAxiosError } = useHandleAxiosError();

	// TODO: Add translations
	// TODO: Add axios caching https://www.npmjs.com/package/axios-cache-adapter
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
			if (!!response.data.token) {
				storeCredentials({
					username: data.userId, 
					password: response.data.token
				});
				return response.data.user as User;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		};
	}

	const signIn = async ({ email, password }: SignInProps): Promise<CredentialsResponse> => {
		try {
			const response = await axios.post(`${url}/${signinUrl}`,
				{
					email: email,
					password: password
				}
			);
			if (!!response.data.user && !!response.data.token) {
				const credentialsResponse = {
					username: response.data.user.userId,
					password: response.data.token
				}
				storeCredentials(credentialsResponse);
				return credentialsResponse as CredentialsResponse;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const getUserByUserId = async ({ authToken, userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		try {
			const response = await axios.get(
				`${url}/${getUserByUserIdUrl}/${userId}`,
				setAuthHeaders(authToken)
			);
			if (!!response.data) {
				return response.data as User;
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const updateUserInfo = async ({ authToken, userId, steamId, subscription, settings, userAvatar }: UpdateUserInfoProps): Promise<UserResponse> => {
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
	};

	const updateUserData = async ({ authToken, userId, data }: UpdateUserDataProps): Promise<UserResponse> => {
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
	};

	const sendEmail = async ({ authToken, from, subject, text }: EmailProps): Promise<UserResponse> => {
		try {
			await axios.post(
				`${url}/${sendEmailUrl}`,
				{
					from: from,
					subject: subject,
					text: text
				},
				setAuthHeaders(authToken)
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
			if (error?.response?.status === requestCodes.UNAUTHORIZED) {
				Alert.alert('Permission Denied', 'Please allow access through your Steam settings.');
			}
		}
	};
	
	const getSteamPlayerAchievements = async (appId: string, steamId: string): Promise<SteamPlayerAchievement | void> => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${config.steamApiToken}&steamid=${steamId}`
			);

			if (!!response?.data?.playerstats) {
				const mappedStats = response?.data?.playerstats.achievements.map((item: any) => {
					return {
						achieved: item.achieved === 1,
						name: item.apiname
					}
				});
				return mappedStats as SteamPlayerAchievement;
			}
		}
		catch (error: AxiosErrorResponse) {
			if (error?.response?.status === requestCodes.UNAUTHORIZED) {
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
			console.log('Could not get achievements for this game.', error.message);
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