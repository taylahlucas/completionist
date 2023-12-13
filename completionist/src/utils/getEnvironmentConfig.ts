import { EnvironmentConfig } from '@utils/CustomInterfaces';

const getEnvironmentConfig: EnvironmentConfig = {
  APP_ID: process.env.APP_ID ?? '',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  LOCAL_URL: process.env.LOCAL_URL ?? ''
};

export default getEnvironmentConfig;
