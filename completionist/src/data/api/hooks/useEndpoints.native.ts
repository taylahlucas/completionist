import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import { signupUrl, signinUrl, getUserByUserIdUrl, updateUserDataUrl, sendEmailUrl } from '../../urls';
import {
	CreateUserProps,
	SignInProps,
	GetUserByUserIdProps,
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

	const updateUserData = async ({ userId, subscription, settings, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<UserResponse> => {
		const authToken = await getAuthToken();
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

	// skyrim SE 489830, skyrim 72850, VR 611670
	// 377160 fallout 4
	// View Profile => copy id address at https://steamcommunity.com/profiles/76561198244929042/
	// Privacy Settings -> Game Inventory must be public
	const getSteamUser = async () => {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=377160&key=${config.steamApiToken}&steamid=76561198244929042`
				// `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=377160&key=${config.steamApiToken}&steamid=76561198244929042`,
				// `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?appid=377160&key=${config.steamApiToken}`
			)
			console.log("RESPONSE: ", response.data.playerstats)
		}
		catch (error: AxiosErrorResponse) {
			// handleAxiosError(error);
			console.log("HERE: ", error.response)
		}
	};



	return { signIn, signUp, getUserByUserId, updateUserData, sendEmail, getSteamUser };
};

export default useEndpoints;