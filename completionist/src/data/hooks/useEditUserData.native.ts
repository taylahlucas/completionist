import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from '../api/hooks/useCache.native';
import useKeychain from './useKeychain.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import { initialUser } from '@redux/MainState';
import useGetNavigationPath from './useGetNavigationPath';

interface EditUserDataReturnType {
	loadUserFromCache: () => void;
	saveUserAndLogin: (user: User, shouldLogin: boolean) => void;
	updateUserData: (user: User, handleNav: boolean) => void;
	removeUserData: () => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const navigation = useReactNavigation();
	const { setUser, setShouldUpdateUser  } = useMainDispatch();
	const { isLoggedIn } = useLoginState();
	const { setLoginFormData, setLoggedIn } = useLoginDispatch();
	const { fetchUserFromCache, saveToCache, clearCache } = useCache();
	const { getCredentials, deleteCredentials } = useKeychain();
	const { getUserByUserId, updateUser } = useEndpoints();
	const getLoginScreenEnum = useGetNavigationPath();

	const loadUserFromCache = async () => {
		const credentials = await getCredentials();

		// Check if data is stored in cache, if not fetch from db and login
		if (!!credentials) {
			fetchUserFromCache(credentials.password)
				.then((cachedData) => {
					if (!!cachedData) {
						saveUserAndLogin(cachedData, true);
					}
					else {
						getUserByUserId({ authToken: credentials.password, userId: credentials.username })
							.then((user) => {
								if (!!user) {
									saveUserAndLogin(user, true);
								}
							})
					}
			});
		}
	};
	
	const saveUserAndLogin = (user: User, shouldLogin: boolean) => {
		setUser(user);
		saveToCache(user);
		setShouldUpdateUser(false);

		if (shouldLogin) {
			setLoggedIn(true);
			navigation.navigate(getLoginScreenEnum(user));
		}
	};
	
	const updateUserData = async (user: User, handleNav: boolean) => {
		if (isLoggedIn) {
			await getCredentials()
				.then((credentials) => {
					if (!!credentials) {
						updateUser({
							authToken: credentials.password,
							...user
						});
						saveUserAndLogin(user, handleNav);
					}
				})
		}
	}

	const removeUserData = () => {
		setUser(initialUser);
		setLoginFormData(initialFormData);
		clearCache();
		deleteCredentials();
		setLoggedIn(false);
		navigation.navigate(ScreenEnum.Login);
		navigation.dispatch(DrawerActions.closeDrawer());
	}

	return { 
		saveUserAndLogin,
		updateUserData,
		removeUserData, 
		loadUserFromCache 
	};
};

export default useEditUserData;