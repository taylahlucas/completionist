import config from './getEnvironmentConfig';

const { APP_ID, ACCESS_TOKEN, GOOGLE_CLIENT_ID, LOCAL_URL } = config;

const appId = APP_ID;
const accessToken = ACCESS_TOKEN;
const googleClientId = GOOGLE_CLIENT_ID;
const localUrl = LOCAL_URL;

export default {
  appId,
  accessToken,
  googleClientId,
  localUrl
}