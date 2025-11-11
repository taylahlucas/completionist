import { Platform } from 'react-native';

// Auth
export const signupUrl = 'api/signup';
export const checkUserExistsUrl = 'api/exists';
export const linkAndSignInUrl = 'api/link';
export const signinUrl = 'api/signin';
export const forgotPwUrl = 'api/reset';
export const sendVerificationEmailUrl = 'send_email/verify';

// Base
export const getUserByUserIdUrl = 'users/id';
export const updateUserUrl = 'users/update';
export const changePwUrl = 'users/update/pw';
export const sendEmailUrl = 'send_email/send';
export const deleteUserUrl = 'users/delete';

// Steam
export const steamProfileUrl = 'steam/profile';
export const steamPlayerAchievementsUrl = 'steam/achievements';
export const steamAchievementsByIdUrl =
  'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=';

// Payments
export const createPaymentUrl = 'payment/create';

// Game Data
export const getGameDataUrl = 'game_data/get';

export const baseUrl =
  Platform.OS === 'ios'
    ? process.env.IOS_LOCAL_URL
    : process.env.ANDROID_LOCAL_URL;
