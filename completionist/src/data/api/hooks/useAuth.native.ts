import useCache from './useCache.native';
import { User } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const useAuth = () => {
	const { setUser } = useMainDispatch();
	const { saveToCache } = useCache();
	
	const saveUserData = (user: User) => {
		saveToCache(user);
		setUser(user);
	};

	const setAuthHeaders = (token: string) => {
		return {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	};

	return { saveUserData, setAuthHeaders };
};

export default useAuth;