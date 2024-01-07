import config from './getEnvironmentConfig';

const { APP_ID, ACCESS_TOKEN, WEB_CLIENT_ID, IOS_LOCAL_URL, ANDROID_LOCAL_URL } = config;

const appId = APP_ID;
const accessToken = ACCESS_TOKEN;
const webClientId = WEB_CLIENT_ID;
const iOSLocalUrl = IOS_LOCAL_URL;
const androidLocalUrl = ANDROID_LOCAL_URL;

export default {
  appId,
  accessToken,
  webClientId,
  iOSLocalUrl,
  androidLocalUrl
}