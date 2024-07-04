import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useKeychain from './useKeychain.native';
import { initialUser } from '@redux/MainState';
import useCache from '../api/hooks/useCache.native';

const useRemoveUserData = () => {
	const { setUser  } = useMainDispatch();
	const { reset } = useLoginDispatch();
	const { deleteCredentials } = useKeychain();
	const { clearCache } = useCache();

	const removeUserData = () => {
		reset();
		setUser(initialUser);
		console.log("removeUserData testing cache error Setting user to: ", initialUser);
		clearCache();
		deleteCredentials();
	}

	return { removeUserData };
};

export default useRemoveUserData;