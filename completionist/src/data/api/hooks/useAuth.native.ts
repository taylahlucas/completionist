import useKeychain from '@data/hooks/useKeychain.native';
import useCache from './useCache.native';
import { User } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const useAuth = () => {
	const { setUser } = useMainDispatch();
	const { saveToCache } = useCache();
	const { storeCredentials, getCredentials } = useKeychain();

	// TODO: Remove saveDataAndLogin and replace with this
	const saveUserData = (user: User) => {
		saveToCache(user);
		setUser(user);
	};

	const getAuthToken = async (): Promise<string> => {
		return await getCredentials()
			.then((token) => !!token ? token?.password : '');
	  };

	const setAuthHeaders = (token: string) => {
		return {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	};

	const storeUserCredentials = (userId: string, token: string) => {
		if (!!userId && !!token) {
			storeCredentials({
				username: userId,
				password: token
			});
		 }
	}

	return { saveUserData, setAuthHeaders, storeUserCredentials, getAuthToken };
};

export default useAuth;