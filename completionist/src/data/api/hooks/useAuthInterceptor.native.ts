import { Platform } from 'react-native';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { useKeychain } from '@data/hooks/index';
import {
  logErrorData,
  logSuccessfulApi,
  logErrorApi,
} from '@utils/hooks/index';
import {
  getApiNameFromUrl,
  AxiosErrorResponse,
  requestCodes,
} from '@utils/index';
import useHandleAxiosError from './useHandleAxiosError';
import envConfig from '@utils/configs/config';

const url =
  Platform.OS === 'ios'
    ? process.env.IOS_LOCAL_URL
    : process.env.ANDROID_LOCAL_URL;

const instance = axios.create({
  baseURL: url,
});

setupCache(instance);

const useAuthInterceptor = () => {
  const { storeCredentials, getCredentials } = useKeychain();
  const { handleAxiosError } = useHandleAxiosError();

  instance.interceptors.request.use(
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

  instance.interceptors.response.use(
    function (response) {
      // Store refresh token when it is returned by the api
      if (response.data.user?.userId && response.data.token) {
        storeCredentials({
          username: response.data.user?.userId,
          password: response.data.token,
        });
      }
      logSuccessfulApi({
        title: getApiNameFromUrl(response.config.url ?? 'No Api Defined'),
        data: response.data,
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

  return instance;
};

export default useAuthInterceptor;
