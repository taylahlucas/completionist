import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useKeychain from './useKeychain.native';
import { initialUser } from '@redux/MainState';
import useCache from '../api/hooks/useCache.native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';

const useRemoveUserData = () => {
	const { setUser, setSelectedGame } = useMainDispatch();
	const { setLoginFormData, triggerIsSigningUp, setLoggedIn, setVerificationToken, setIsAuthenticated } = useLoginDispatch();
	const { setSelectedCategory } = useContentDispatch();
	const { deleteCredentials } = useKeychain();
	const { clearCache } = useCache();

	const removeUserData = () => {
		console.log("Removing user data");
		setVerificationToken('');
		setSelectedCategory({
			category: ''
		});
		setIsAuthenticated(false);
		setLoggedIn(false);
		setLoginFormData(initialFormData);
		triggerIsSigningUp(false);
		setUser(initialUser);
		setSelectedGame(undefined);
		clearCache();
		deleteCredentials();
	}

	return { removeUserData };
};

export default useRemoveUserData;