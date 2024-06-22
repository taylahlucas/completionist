import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useKeychain from './useKeychain.native';
import { initialUser } from '@redux/MainState';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import useCache from '../api/hooks/useCache.native';

const useRemoveUserData = () => {
	const { setUser  } = useMainDispatch();
	const { setLoginFormData, setLoggedIn, setIsAuthenticated } = useLoginDispatch();
	const { deleteCredentials } = useKeychain();
	const { clearCache } = useCache();

	const removeUserData = () => {
		console.log("HEREEEE")
		setUser(initialUser);
		setLoginFormData(initialFormData);
		clearCache();
		deleteCredentials();
	}

	return { removeUserData };
};

export default useRemoveUserData;