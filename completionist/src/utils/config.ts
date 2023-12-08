import config from './getEnvironmentConfig';

const { APP_ID, GRAPHQL_ENDPOINT, WEB_CLIENT_ID } = config;

const appId = APP_ID;
const graphQLEndpoint = GRAPHQL_ENDPOINT;
const webClientId = WEB_CLIENT_ID;

export default {
  appId,
  graphQLEndpoint,
  webClientId
}