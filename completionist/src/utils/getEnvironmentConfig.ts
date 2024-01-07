import { EnvironmentConfig } from '@utils/CustomInterfaces';

const getEnvironmentConfig: EnvironmentConfig = {
  APP_ID: process.env.APP_ID ?? '',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? '',
  WEB_CLIENT_ID: process.env.WEB_CLIENT_ID ?? '',
  IOS_LOCAL_URL: process.env.IOS_LOCAL_URL ?? '',
  ANDROID_LOCAL_URL: process.env.ANDROID_LOCAL_URL ?? ''
};

export default getEnvironmentConfig;
