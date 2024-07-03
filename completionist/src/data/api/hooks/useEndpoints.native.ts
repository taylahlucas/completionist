import { Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AchievementItem, User, SteamProfile } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import {
	getUserByUserIdUrl,
	updateUserUrl,
	sendEmailUrl,
	steamProfileUrl,
	steamPlayerAchievementsUrl,
	changePwUrl
} from '../../urls';
import {
	GetUserByUserIdProps,
	SendEmailProps,
	EndpointsReturnType,
	ChangePwProps,
	SteamAchievementsProps,
	SteamAchievementsReturnType
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import { requestCodes } from '@utils/constants';
import useAuthInterceptor from './useAuthInterceptor.native';
import useKeychain from '@data/hooks/useKeychain.native';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { t } = useTranslation();
	const { handleAxiosError } = useHandleAxiosError();
	const authInterceptor = useAuthInterceptor();
	const { storeCredentials } = useKeychain();

	// TODO: Add axios caching https://www.npmjs.com/package/axios-cache-adapter
	const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		console.log("getUserByUserId")
		try {
			const response = await authInterceptor.get(
				`${url}/${getUserByUserIdUrl}/${userId}`
			);
			if (response.data.user) {
				if (response.data.token) {
					storeCredentials({
						username: response.data.user.userId,
						password: response.data.token
					});
				}
				return response.data.user as User;
			}
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const updateUser = async (user: User): Promise<UserResponse> => {
		console.log("updateUser")
		try {
			const response = await authInterceptor.patch(
				`${url}/${updateUserUrl}/${user.userId}`,
				{
					username: user.username,
					email: user.email,
					steamId: user.steamId,
					activeGames: user.activeGames,
					signup: user.signup,
					settings: user.settings,
					gameData: user.gameData
				}
			);
			if (response.data.token) {
				storeCredentials({
					username: user.userId,
					password: response.data.token
				});
			}
			return user;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response?.status);
		}
	};

	const changePw = async ({ userId, oldPw, newPw }: ChangePwProps) => {
		try {
			await authInterceptor.patch(`${url}/${changePwUrl}/${userId}`,
				{
					oldPw,
					newPw
				}
			);
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response?.status);
		}
	}
	
	const sendEmail = async ({ emailTo, subject, text }: SendEmailProps): Promise<void> => {		
		try {
			console.log("Sending Email")
			await authInterceptor.post(
				`${url}/${sendEmailUrl}`,
				{
					from: emailTo,
					subject: subject,
					text: `${emailTo}\n\n${text}`
				}
			);
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const getSteamUserById = async (userId: string, steamId: string): Promise<SteamProfile | void> => {
		try {
			const response = await authInterceptor.get(
				`${url}/${steamProfileUrl}?steamId=${steamId}`
			);

			if (!!response?.data) {
				if (response.data.token) {
					storeCredentials({
						username: userId,
						password: response.data.token
					});
				}
				return response?.data?.profile as SteamProfile;
			}
			else {
				Alert.alert('Steam ID not found.');
			}
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response.status);
		}
	};

	const getSteamPlayerAchievements = async ({ userId, steamId, gameId }: SteamAchievementsProps): Promise<SteamAchievementsReturnType | void> => {
		try {
			const response = await authInterceptor.get(
				`${url}/${steamPlayerAchievementsUrl}?steamId=${steamId}&gameId=${gameId}`,
			);
			if (response?.data) {
				if (response.data.token) {
					storeCredentials({
						username: userId,
						password: response.data.token
					});
				}

				return {
					hasPermission: response?.data.hasPermission,
					achievements: response?.data.achievements as AchievementItem[],
					noOfLocked: response?.data.noOfLocked
				};
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

	return {
		getUserByUserId,
		updateUser,
		changePw,
		sendEmail,
		getSteamUserById,
		getSteamPlayerAchievements
	};
};

export default useEndpoints;