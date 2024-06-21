import { Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SteamAchievement, AchievementItem, User, SteamProfile } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import {
	getUserByUserIdUrl,
	updateUserUrl,
	updateSignUpUrl,
	sendEmailUrl,
	steamProfileUrl,
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
	ChangePwProps,
	SteamAchievementsProps
} from '@data/api/EndpointInterfaces.native';
import useHandleAxiosError from './useHandleAxiosError';
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
		console.log("getUserByUserId")
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
		console.log("updateUser")
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
		console.log("updateSignUp")
		try {
			await authInterceptor.patch(
				`${url}/${updateSignUpUrl}/${userId}`,
				{
					verification: signup.verification,
					setUsername: signup.setUsername,
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

	const getSteamUserById = async (steamId: string): Promise<SteamProfile | void> => {
		try {
			const response = await authInterceptor.get(
				`${url}/${steamProfileUrl}?steamId=${steamId}`
			);

			if (!!response?.data) {
				return response?.data as SteamProfile;
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

	const getSteamPlayerAchievements = async ({ steamId, gameId }: SteamAchievementsProps): Promise<AchievementItem[] | void> => {
		try {
			const response = await authInterceptor.get(
				`${url}/${steamPlayerAchievementsUrl}?steamId=${steamId}&gameId=${gameId}`,
			);
			if (response?.data) {
				return response?.data as AchievementItem[];
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
		updateSignUp,
		changePw,
		sendEmail,
		getSteamUserById,
		getSteamPlayerAchievements
	};
};

export default useEndpoints;