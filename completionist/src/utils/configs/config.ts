import config from './getEnvironmentConfig';

const {
  ACCESS_TOKEN,
  WEB_CLIENT_ID,
  IOS_LOCAL_URL,
  ANDROID_LOCAL_URL,
  STEAM_API_TOKEN,
} = config;

const accessToken = ACCESS_TOKEN;
const webClientId = WEB_CLIENT_ID;
const iOSLocalUrl = IOS_LOCAL_URL;
const androidLocalUrl = ANDROID_LOCAL_URL;
const steamApiToken = STEAM_API_TOKEN;

export default {
  accessToken,
  webClientId,

  iOSLocalUrl,
  androidLocalUrl,
  steamApiToken,
};
