import config from './getEnvironmentConfig';

const { APP_ID, ACCESS_TOKEN, GRAPHQL_ENDPOINT, GOOGLE_CLIENT_ID } = config;

const appId = APP_ID;
const accessToken = ACCESS_TOKEN;
const graphQLEndpoint = GRAPHQL_ENDPOINT;
const googleClientId = GOOGLE_CLIENT_ID;

export default {
  appId,
  accessToken,
  graphQLEndpoint,
  googleClientId
}