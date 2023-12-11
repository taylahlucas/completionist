import { EnvironmentConfig } from '@utils/CustomInterfaces';

const getEnvironmentConfig: EnvironmentConfig = {
  APP_ID: process.env.APP_ID ?? '',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? '',
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT ?? '',
  WEB_CLIENT_ID: process.env.WEB_CLIENT_ID ?? ''
};

export default getEnvironmentConfig;
