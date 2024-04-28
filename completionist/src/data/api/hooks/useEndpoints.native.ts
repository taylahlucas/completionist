import { Alert, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { SteamAchievement, SteamPlayerAchievement, User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, StringResponse, UserResponse } from '@utils/CustomTypes';
import {
	checkUserExistsUrl,
	linkAndSignInUrl,
	signupUrl,
	signinUrl,
	getUserByUserIdUrl,
	updateUserUrl,
	sendEmailUrl,
	steamUserByIdUrl,
	steamPlayerAchievementsUrl,
	steamAchievementsByIdUrl
} from '../../urls';
import {
	CreateUserProps,
	SignInProps,
	GetUserByUserIdProps,
	UpdateUserProps,
	EmailProps,
	EndpointsReturnType,
	CredentialsExistProps
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import useAuth from './useAuth.native';
import config from '@utils/config';
import { requestCodes } from '@utils/constants';
import useKeychain from '@data/hooks/useKeychain.native';
import { useTranslation } from 'react-i18next';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { t } = useTranslation();
	const { setAuthHeaders } = useAuth();
	const { storeCredentials } = useKeychain();
	const { handleAxiosError } = useHandleAxiosError();

	// TODO: Add translations
	// TODO: Add axios caching https://www.npmjs.com/package/axios-cache-adapter
	// TODO: Send email verification for user
	// TODO: Initial game selection for google account sign up
	const checkUserExists = async (email: string): Promise<CredentialsExistProps> => {
		try {
			const response = await axios.post(`${url}/${checkUserExistsUrl}`,
				{
					email: email.toLocaleLowerCase(),
				}
			);
			return response.data as CredentialsExistProps;
		}
		catch {
			return {
				regular: false,
				google: false
			};
		}
	}

	const signUp = async ({ data }: CreateUserProps): Promise<UserResponse> => {
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
			const response = await axios.post(`${url}/${linkAndSignInUrl}`,
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

	const getUserByUserId = async ({ authToken, userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		try {
			const response = await axios.get(
				`${url}/${getUserByUserIdUrl}/${userId}`,
				setAuthHeaders(authToken)
			);
			if (!!response.data) {
				return response.data as User;
			}
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const updateUser = async ({ authToken, userId, steamId, subscription, settings, userAvatar, data }: UpdateUserProps): Promise<UserResponse> => {
		try {
			await axios.post(
				`${url}/${updateUserUrl}`,
				{
					userId: userId,
					steamId: steamId,
					subscription: subscription,
					settings: settings,
					userAvatar: userAvatar,
					data: data
				},
				setAuthHeaders(authToken)
			);
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	// Split to sendVerificationEmail and sendRequestEmail?
	const sendEmail = async ({ emailTo, subject, text }: EmailProps): Promise<void> => {
		try {
			await axios.post(
				`${url}/${sendEmailUrl}`,
				{
					to: emailTo,
					subject: subject,
					text: text
				},
				// setAuthHeaders(authToken)
			);
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const getSteamUserById = async (appId: string, steamId: string): Promise<StringResponse> => {
		try {
			const response = await axios.get(
				`${steamUserByIdUrl}${appId}&key=${config.steamApiToken}&steamid=${steamId}`
			);

			if (!!response?.data?.playerstats?.steamID) {
				return response?.data?.playerstats?.steamID;
			}
			else {
				Alert.alert('Steam ID not found.');
			}
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const getSteamPlayerAchievements = async (appId: string, steamId: string): Promise<SteamPlayerAchievement | void> => {
		try {
			const response = await axios.get(
				`${steamPlayerAchievementsUrl}${appId}&key=${config.steamApiToken}&steamid=${steamId}`
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
				handleAxiosError(error.response.status);
			}
			else {
				Alert.alert(
					t('common:errors.error'),
					t('common:errors.steamAchievements')
				);
			}
		}
	};

	const getSteamAchievementsById = async (appId: string): Promise<(SteamAchievement[] | void)> => {
		try {
			const response = await axios.get(
				`${steamAchievementsByIdUrl}${config.steamApiToken}&appid=${appId}&l=english&format=json`
			);

			return response.data.game.availableGameStats.achievements as SteamAchievement[];
		}
		catch (error: AxiosErrorResponse) {
			console.log('Could not get achievements for this game.', error.message);
		}
	};

	return {
		checkUserExists,
		linkAndSignIn,
		signIn,
		signUp,
		getUserByUserId,
		updateUser,
		sendEmail,
		getSteamUserById,
		getSteamPlayerAchievements,
		getSteamAchievementsById
	};
};

export default useEndpoints;