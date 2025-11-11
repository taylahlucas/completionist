import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import {
  logErrorData,
  logSuccessfulApi,
  logErrorApi,
} from '@utils/helpers/index';
import {
  getApiNameFromUrl,
  AxiosErrorResponse,
  requestCodes,
} from '@utils/index';
import { handleAxiosError } from './handle-axios-error';
import envConfig from '@utils/configs/config';
import { baseUrl } from './urls';
import { getCredentials, storeCredentials } from '@data/cache';

const authInterceptor = axios.create({
  baseURL: baseUrl,
});

setupCache(authInterceptor);

authInterceptor.interceptors.request.use(
  async function (config) {
    const credentials = await getCredentials();

    // Set token in the request header
    if (config?.url?.includes('payment/create')) {
      config.headers.Authorization = `Bearer ${envConfig.stripeSecretKey}`;
      config.headers[
        'X-Secondary-Auth'
      ] = `Bearer ${envConfig.stripeSecretKey}`;
    }
    if (credentials) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

authInterceptor.interceptors.response.use(
  function (response) {
    // Store refresh token when it is returned by the api
    if (response.data.user?.userId && response.data.token) {
      storeCredentials({
        username: response.data.user?.userId,
        password: response.data.token,
      });
    }
    logSuccessfulApi({
      title: 'Successful API Call',
      // data: response.data,
      data: {
        api: getApiNameFromUrl(response.config.url ?? 'No Api Defined'),
      },
    });
    return response;
  },
  function (error: AxiosErrorResponse) {
    logErrorApi({
      title: getApiNameFromUrl(error.config?.url ?? 'No Api Defined'),
      data: {
        error: logErrorData(error),
        data: JSON.stringify(error.config?.data, null, 2),
      },
    });
    if (error.config?.url.includes('steam')) {
      if (error?.response?.status === requestCodes.UNAUTHORIZED) {
        handleAxiosError(error.response?.status);
      }
      return Promise.reject(error);
    }
    handleAxiosError(error.response?.status);
    return Promise.reject(error);
  },
);

export default authInterceptor;
