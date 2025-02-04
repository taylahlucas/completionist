import { EnvironmentConfig } from '@utils/CustomInterfaces';

const getEnvironmentConfig: EnvironmentConfig = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? '',
  WEB_CLIENT_ID: process.env.WEB_CLIENT_ID ?? '',
  IOS_LOCAL_URL: process.env.IOS_LOCAL_URL ?? '',
  ANDROID_LOCAL_URL: process.env.ANDROID_LOCAL_URL ?? '',
  STEAM_API_TOKEN: process.env.STEAM_API_TOKEN ?? '',
  STRIPE_TEST_TOKEN: process.env.STRIPE_TEST_TOKEN ?? '',
  STRIPE_LIVE_TOKEN: process.env.STRIPE_LIVE_TOKEN ?? '',
};

export default getEnvironmentConfig;
