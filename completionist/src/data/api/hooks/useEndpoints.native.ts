import { Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  requestCodes,
  SteamAchievementItem,
  User,
  SteamProfile,
  AxiosErrorResponse,
  UserResponse,
} from '@utils/index';
import {
  getUserByUserIdUrl,
  updateUserUrl,
  sendEmailUrl,
  deleteUserUrl,
  steamProfileUrl,
  steamPlayerAchievementsUrl,
  changePwUrl,
  createPaymentUrl,
} from '../../urls';
import {
  GetUserByUserIdProps,
  SendEmailProps,
  EndpointsReturnType,
  ChangePwProps,
  SteamAchievementsProps,
  SteamAchievementsReturnType,
  CreatePaymentProps,
} from '@data/api/EndpointInterfaces.native';
import useAuthInterceptor from './useAuthInterceptor.native';

const url =
  Platform.OS === 'ios'
    ? process.env.IOS_LOCAL_URL
    : process.env.ANDROID_LOCAL_URL;

const useEndpoints = (): EndpointsReturnType => {
  const { t } = useTranslation();
  const authInterceptor = useAuthInterceptor();

  // TODO: Add axios caching https://www.npmjs.com/package/axios-cache-adapter
  const getUserByUserId = async ({
    userId,
  }: GetUserByUserIdProps): Promise<UserResponse> =>
    await authInterceptor
      .get(`${url}/${getUserByUserIdUrl}/${userId}`)
      .then(response => {
        if (response.data.user) {
          return response.data.user as User;
        }
        return;
      });

  const updateUser = async (user: User): Promise<UserResponse> =>
    await authInterceptor
      .patch(`${url}/${updateUserUrl}/${user.userId}`, {
        username: user.username,
        email: user.email,
        steamId: user.steamId,
        signup: user.signup,
        settings: user.settings,
        gameData: user.gameData ?? [],
      })
      .then(() => user);

  const changePw = async ({
    userId,
    oldPw,
    newPw,
  }: ChangePwProps): Promise<boolean> =>
    await authInterceptor
      .patch(`${url}/${changePwUrl}/${userId}`, {
        oldPw,
        newPw,
      })
      .then(() => true);

  const sendEmail = async ({
    emailTo,
    subject,
    text,
  }: SendEmailProps): Promise<void> =>
    await authInterceptor.post(`${url}/${sendEmailUrl}`, {
      from: emailTo,
      subject: subject,
      text: `${emailTo}\n\n${text}`,
    });

  const deleteUser = async (userId: string): Promise<void> =>
    await authInterceptor.delete(`${url}/${deleteUserUrl}/${userId}`);

  const getSteamUserById = async (
    steamId: string,
  ): Promise<SteamProfile | void> =>
    await authInterceptor
      .get(`${url}/${steamProfileUrl}?steamId=${steamId}`)
      .then(response => {
        if (!!response?.data) {
          return response?.data?.profile as SteamProfile;
        } else {
          Alert.alert(t('common:errors.noSteamId'));
          return;
        }
      });

  const getSteamPlayerAchievements = async ({
    steamId,
    gameId,
  }: SteamAchievementsProps): Promise<SteamAchievementsReturnType | void> => {
    try {
      const response = await authInterceptor.get(
        `${url}/${steamPlayerAchievementsUrl}?steamId=${steamId}&gameId=${gameId}`,
      );
      if (response?.data) {
        return {
          hasPermission: response?.data.hasPermission,
          achievements: response?.data.achievements as SteamAchievementItem[],
          noOfLocked: response?.data.noOfLocked,
        };
      }
    } catch (error: AxiosErrorResponse) {
      if (error?.response?.status !== requestCodes.UNAUTHORIZED) {
        Alert.alert(
          t('common:errors.error'),
          t('common:errors.steamAchievements'),
        );
      }
    }
  };

  const createPayment = async ({
    userId,
    amount,
    game,
  }: CreatePaymentProps): Promise<any> =>
    await authInterceptor
      .post(`${url}/${createPaymentUrl}/${userId}`, {
        amount,
        game,
      })
      .then(response => {
        return response;
      });

  return {
    getUserByUserId,
    updateUser,
    changePw,
    sendEmail,
    deleteUser,
    getSteamUserById,
    getSteamPlayerAchievements,
    createPayment,
  };
};

export default useEndpoints;
