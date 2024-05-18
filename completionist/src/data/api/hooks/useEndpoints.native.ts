import { Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SteamAchievement, SteamPlayerAchievement, User } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, StringResponse, UserResponse } from '@utils/CustomTypes';
import {
	getUserByUserIdUrl,
	updateUserUrl,
	updateSignUpUrl,
	sendEmailUrl,
	steamUserByIdUrl,
	steamPlayerAchievementsUrl,
	steamAchievementsByIdUrl,
	changePwUrl
} from '../../urls';
import {
	GetUserByUserIdProps,
	UpdateUserProps,
	SendEmailProps,
	EndpointsReturnType,
	UpdateSignUpProps,
	ChangePwProps
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
import config from '@utils/config';
import { requestCodes } from '@utils/constants';
import useAuthInterceptor from './useAuthInterceptor.native';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { t } = useTranslation();
	const { handleAxiosError } = useHandleAxiosError();
	const authInterceptor = useAuthInterceptor();

	// TODO: Add axios caching https://www.npmjs.com/package/axios-cache-adapter
	const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
		try {
			const response = await authInterceptor.get(
				`${url}/${getUserByUserIdUrl}/${userId}`
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

	const updateUser = async ({ userId, name, email, steamId, subscription, settings, userAvatar, data }: UpdateUserProps): Promise<UserResponse> => {
		try {
			await authInterceptor.patch(
				`${url}/${updateUserUrl}/${userId}`,
				{
					name: name,
					email: email,
					steamId: steamId,
					subscription: subscription,
					settings: settings,
					userAvatar: userAvatar,
					data: data
				}
			);
			return;
		}
		catch (error: AxiosErrorResponse) {
			handleAxiosError(error.response?.status);
		}
	};

	const updateSignUp = async ({ userId, signup }: UpdateSignUpProps): Promise<void> => {
		try {
			await authInterceptor.patch(
				`${url}/${updateSignUpUrl}/${userId}`,
				{
					verification: signup.verification,
					selectPlan: signup.selectPlan,
					selectGame: signup.selectGame
				}
			);
			return;
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

	const getSteamUserById = async (appId: string, steamId: string): Promise<StringResponse> => {
		try {
			const response = await authInterceptor.get(
				`${steamUserByIdUrl}${appId}&key=${config.steamApiToken}&steamid=${steamId}`
			);

			if (!!response?.data?.playerstats?.steamID) {
				return response?.data?.playerstats?.steamID;
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

	const getSteamPlayerAchievements = async (appId: string, steamId: string): Promise<SteamPlayerAchievement | void> => {
		try {
			const response = await authInterceptor.get(
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
			const response = await authInterceptor.get(
				`${steamAchievementsByIdUrl}${config.steamApiToken}&appid=${appId}&l=english&format=json`
			);

			return response.data.game.availableGameStats.achievements as SteamAchievement[];
		}
		catch (error: AxiosErrorResponse) {
			console.log('Could not get achievements for this game.', error.message);
		}
	};

	return {
		getUserByUserId,
		updateUser,
		updateSignUp,
		changePw,
		sendEmail,
		getSteamUserById,
		getSteamPlayerAchievements,
		getSteamAchievementsById
	};
};

export default useEndpoints;