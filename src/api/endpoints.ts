import { Alert } from 'react-native';
import i18next from 'i18next';
import {
  ChangePwProps,
  CreatePaymentProps,
  GetGameDataProps,
  GetUserByUserIdProps,
  SendEmailProps,
  SteamAchievementsProps,
  SteamAchievementsReturnType,
} from './endpoint-interfaces';
import axiosInstance from './axios-instance';
import {
  baseUrl,
  getUserByUserIdUrl,
  updateUserUrl,
  changePwUrl,
  sendEmailUrl,
  deleteUserUrl,
  steamProfileUrl,
  steamPlayerAchievementsUrl,
  createPaymentUrl,
  getGameDataUrl,
} from 'src/api/urls';
import {
  requestCodes,
  UserResponse,
  GameContentItem,
  SteamAchievementItem,
  SteamProfile,
  User,
  AxiosErrorResponse,
} from '@utils/index';

export const getUserByUserId = async ({
  userId,
}: GetUserByUserIdProps): Promise<UserResponse> =>
  await axiosInstance
    .get(`${baseUrl}/${getUserByUserIdUrl}/${userId}`)
    .then(response => {
      if (response.data.user) {
        return response.data.user as User;
      }
      return;
    });

export const updateUser = async (user: User): Promise<UserResponse> =>
  await axiosInstance
    .patch(`${baseUrl}/${updateUserUrl}/${user.userId}`, {
      username: user.username,
      email: user.email,
      steamId: user.steamId,
      account: user.account,
      signup: user.signup,
      settings: user.settings,
      gameData: user.gameData ?? [],
    })
    .then(() => user);

export const changePw = async ({
  userId,
  oldPw,
  newPw,
}: ChangePwProps): Promise<boolean> =>
  await axiosInstance
    .patch(`${baseUrl}/${changePwUrl}/${userId}`, {
      oldPw,
      newPw,
    })
    .then(() => true);

export const sendEmail = async ({
  emailTo,
  subject,
  text,
}: SendEmailProps): Promise<void> =>
  await axiosInstance.post(`${baseUrl}/${sendEmailUrl}`, {
    from: emailTo,
    subject: subject,
    text: `${emailTo}\n\n${text}`,
  });

export const deleteUser = async (userId: string): Promise<void> =>
  await axiosInstance.delete(`${baseUrl}/${deleteUserUrl}/${userId}`);

export const getSteamUserById = async (
  steamId: string,
): Promise<SteamProfile | void> =>
  await axiosInstance
    .get(`${baseUrl}/${steamProfileUrl}?steamId=${steamId}`)
    .then(response => {
      if (response?.data) {
        return response?.data?.profile as SteamProfile;
      } else {
        Alert.alert(i18next.t('common:errors.noSteamId'));
        return;
      }
    });

export const getSteamPlayerAchievements = async ({
  steamId,
  gameId,
}: SteamAchievementsProps): Promise<SteamAchievementsReturnType | void> => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/${steamPlayerAchievementsUrl}?steamId=${steamId}&gameId=${gameId}`,
    );
    if (response?.data) {
      return {
        hasPermission: response?.data.hasPermission,
        achievements: response?.data.achievements as SteamAchievementItem[],
        noOfLocked: response?.data.noOfLocked || response?.data.remainingLocked,
      };
    }
  } catch (error: AxiosErrorResponse) {
    if (
      (error as AxiosErrorResponse)?.response?.status !==
      requestCodes.UNAUTHORIZED
    ) {
      Alert.alert(
        i18next.t('common:errors.error'),
        i18next.t('common:errors.steamAchievements'),
      );
    }
  }
};

export const createPayment = async ({
  userId,
  amount,
  game,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
CreatePaymentProps): Promise<any> =>
  await axiosInstance
    .post(`${baseUrl}/${createPaymentUrl}/${userId}`, {
      amount,
      game,
    })
    .then(response => response);

export const getGameData = async ({
  game,
  lang,
}: GetGameDataProps): Promise<GameContentItem[] | void> =>
  await axiosInstance
    .get(`${baseUrl}/${getGameDataUrl}/?game=${game}&lang=${lang}`)
    .then(response => response.data.response.Items as GameContentItem[]);
