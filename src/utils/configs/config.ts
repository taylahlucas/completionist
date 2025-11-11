import { config } from './get-environment-configs';

const {
  ACCESS_TOKEN,
  WEB_CLIENT_ID,
  IOS_LOCAL_URL,
  ANDROID_LOCAL_URL,
  STEAM_API_TOKEN,
  STRIPE_TEST_TOKEN,
  STRIPE_LIVE_TOKEN,
  STRIPE_SECRET_KEY,
} = config;

const accessToken = ACCESS_TOKEN;
const webClientId = WEB_CLIENT_ID;
const iOSLocalUrl = IOS_LOCAL_URL;
const androidLocalUrl = ANDROID_LOCAL_URL;
const steamApiToken = STEAM_API_TOKEN;
const stripeTestToken = STRIPE_TEST_TOKEN;
const stripeLiveToken = STRIPE_LIVE_TOKEN;
const stripeSecretKey = STRIPE_SECRET_KEY;

export default {
  accessToken,
  webClientId,

  iOSLocalUrl,
  androidLocalUrl,
  steamApiToken,
  stripeTestToken,
  stripeLiveToken,
  stripeSecretKey,
};
