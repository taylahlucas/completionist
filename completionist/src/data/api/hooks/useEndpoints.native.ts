import { Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AchievementItem, User, SteamProfile } from '@utils/CustomInterfaces';
import { AxiosErrorResponse, UserResponse } from '@utils/CustomTypes';
import {
	getUserByUserIdUrl,
	updateUserUrl,
	sendEmailUrl,
	deleteUserUrl,
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
import useLogger from '@utils/hooks/useLogger';

const useEndpoints = (): EndpointsReturnType => {
	const url = Platform.OS === 'ios'
		? process.env.IOS_LOCAL_URL
		: process.env.ANDROID_LOCAL_URL;
	const { t } = useTranslation();
	const { logSuccessfulApi, logErrorApi } = useLogger();
	const { handleAxiosError } = useHandleAxiosError();
	const authInterceptor = useAuthInterceptor();
	const { storeCredentials } = useKeychain();

	// TODO: Add axios caching https://www.npmjs.com/package/axios-cache-adapter
	const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
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
				logSuccessfulApi({
					title: 'Get User By Id',
					data: {
						userId
					}
				});
				return response.data.user as User;
			}
			return;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Get User By Id',
				data: {
					userId,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			handleAxiosError(error.response?.status);
		}
	};

	const updateUser = async (user: User): Promise<UserResponse> => {
		try {
			const response = await authInterceptor.patch(
				`${url}/${updateUserUrl}/${user.userId}`,
				{
					username: user.username,
					email: user.email,
					steamId: user.steamId,
					signup: user.signup,
					settings: user.settings,
					gameData: user.gameData ?? []
				}
			);
			if (response.data.token) {
				storeCredentials({
					username: user.userId,
					password: response.data.token
				});
			}
			logSuccessfulApi({
				title: 'Updated user',
				data: {
					email: user.email
				}
			});
			return user;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Updated user',
				data: {
					email: user.email,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			handleAxiosError(error.response?.status);
		}
	};

	const changePw = async ({ userId, oldPw, newPw }: ChangePwProps): Promise<boolean> => {
		try {
			await authInterceptor.patch(`${url}/${changePwUrl}/${userId}`,
				{
					oldPw,
					newPw
				}
			);
			logSuccessfulApi({
				title: 'Changed Password',
				data: {
					userId
				}
			});
			return true;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Changed Password',
				data: {
					userId,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			handleAxiosError(error.response?.status);
			return false;
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
			logSuccessfulApi({
				title: 'Sending Email',
				data: {
					emailTo
				}
			});
			return;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Sending Email',
				data: {
					emailTo,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			handleAxiosError(error.response?.status);
		}
	};

	const deleteUser = async (userId: string): Promise<void> => {
		try {
			await authInterceptor.delete(
				`${url}/${deleteUserUrl}/${userId}`
			);
			logSuccessfulApi({
				title: 'Deleting User',
				data: {
					userId
				}
			});
			return;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Deleting User',
				data: {
					userId,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			handleAxiosError(error.response?.status);
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
				logSuccessfulApi({
					title: 'Get Steam User By Id',
					data: {
						userId,
						steamId
					}
				});
				return response?.data?.profile as SteamProfile;
			}
			else {
				logErrorApi({
					title: 'Get Steam User By Id',
					data: {
						userId,
						steamId,
						message: 'Steam ID not found.'
					}
				});
				Alert.alert('Steam ID not found.');
			}
			return;
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Get Steam User By Id',
				data: {
					userId,
					steamId,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			handleAxiosError(error.response?.status);
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
				logSuccessfulApi({
					title: 'Get Steam Achievements',
					data: {
						userId,
						steamId,
						gameId
					}
				});
				return {
					hasPermission: response?.data.hasPermission,
					achievements: response?.data.achievements as AchievementItem[],
					noOfLocked: response?.data.noOfLocked
				};
			}
		}
		catch (error: AxiosErrorResponse) {
			logErrorApi({
				title: 'Get Steam Achievements',
				data: {
					userId,
					steamId,
					gameId,
					error: {
						code: error.code,
						message: error.message,
						request: JSON.stringify(error.request, null, 2),
						response: JSON.stringify(error.response, null, 2)
					}
				}
			});
			if (error?.response?.status === requestCodes.UNAUTHORIZED) {
				handleAxiosError(error.response?.status);
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
		deleteUser,
		getSteamUserById,
		getSteamPlayerAchievements
	};
};

export default useEndpoints;