import { Platform } from 'react-native';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import useKeychain from '@data/hooks/useKeychain.native';

const useAuthInterceptor = () => {
	const { getCredentials } = useKeychain();

	const url = Platform.OS === 'ios'
	? process.env.IOS_LOCAL_URL
	: process.env.ANDROID_LOCAL_URL;
	
	const instance = axios.create({
		baseURL: url
	});

	setupCache(instance);

	instance.interceptors.request.use(
		async function (config) {
			// Get token from Keychain or AsyncStorage
			const credentials = await getCredentials();
	
			// Set token in the request header
			if (credentials) {
				config.headers.Authorization = `Bearer ${credentials.password}`;
			}
	
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);

	return instance;
};

export default useAuthInterceptor;