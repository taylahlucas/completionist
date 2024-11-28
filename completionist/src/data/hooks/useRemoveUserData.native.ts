import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useKeychain from './useKeychain.native';
import { initialUser } from '@redux/MainState';
import useCache from '../api/hooks/useCache.native';
import { initialFormData } from '@components/custom/LoginForm/provider/LoginState';
import useContentDispatch from '@components/custom/ContentList/provider/useContentDispatch';
import { useLogger } from '@utils/hooks/index';

const useRemoveUserData = () => {
	const { log } = useLogger();
	const { setUser, setSelectedGame } = useMainDispatch();
	const { setLoginFormData, triggerIsSigningUp, setLoggedIn, setVerificationToken, setIsAuthenticated } = useLoginDispatch();
	const { setSelectedCategory } = useContentDispatch();
	const { deleteCredentials } = useKeychain();
	const { clearCache } = useCache();

	const removeUserData = () => {
		log({
			title: 'Removing User Data'
		});
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