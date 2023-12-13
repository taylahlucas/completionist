import config from './getEnvironmentConfig';

const { APP_ID, ACCESS_TOKEN, GOOGLE_CLIENT_ID } = config;

const appId = APP_ID;
const accessToken = ACCESS_TOKEN;
const googleClientId = GOOGLE_CLIENT_ID;

export default {
  appId,
  accessToken,
  googleClientId
}