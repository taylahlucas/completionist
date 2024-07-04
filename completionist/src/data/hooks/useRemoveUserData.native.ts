import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useKeychain from './useKeychain.native';
import { initialUser } from '@redux/MainState';
import useCache from '../api/hooks/useCache.native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';

const useRemoveUserData = () => {
	const { setUser  } = useMainDispatch();
	const { setLoginFormData, triggerIsSigningUp, setLoggedIn, setVerificationToken, setIsAuthenticated } = useLoginDispatch();
	const { deleteCredentials } = useKeychain();
	const { clearCache } = useCache();

	const removeUserData = () => {
		setVerificationToken('');
		setIsAuthenticated(false);
		setLoggedIn(false);
		setLoginFormData(initialFormData);
		triggerIsSigningUp(false);
		setUser(initialUser);
		console.log("removeUserData testing cache error Setting user to: ", initialUser);
		clearCache();
		deleteCredentials();
	}

	return { removeUserData };
};

export default useRemoveUserData;