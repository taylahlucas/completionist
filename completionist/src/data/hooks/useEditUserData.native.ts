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
import useMainState from '@redux/hooks/useMainState';

interface EditUserDataReturnType {
	loadUserData: () => void;
	saveUserAndLogin: (user: User, shouldLogin: boolean) => void;
	updateUser: (user: User) => void;
	removeUserData: () => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const navigation = useReactNavigation();
	const { shouldUpdateUser } = useMainState();
	const { setUser, setShouldUpdateUser  } = useMainDispatch();
	const { isLoggedIn } = useLoginState();
	const { setLoginFormData, setLoggedIn } = useLoginDispatch();
	const { fetchUserFromCache, saveToCache, clearCache } = useCache();
	const { getCredentials, deleteCredentials } = useKeychain();
	const { getUserByUserId, updateUserInfo, updateUserData } = useEndpoints();

	const loadUserData = async () => {
		const credentials = await getCredentials();

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
			setLogin();
		}
	};

	const setLogin = () => {
		setLoggedIn(true);
		navigation.navigate(ScreenEnum.GameSelection);
	}

	const updateUser = async (user: User) => {
		if (shouldUpdateUser && isLoggedIn) {
			await getCredentials()
				.then((credentials) => {
					if (!!credentials) {
						updateUserInfo({
							authToken: credentials.password,
							userId: user.userId,
							steamId: user.steamId,
							subscription: user.subscription,
							settings: user.settings,
							userAvatar: user.userAvatar
						});
						updateUserData({
							authToken: credentials.password,
							userId: user.userId,
							data: {
								skyrim: user.data.skyrim,
								fallout4: user.data.fallout4
							}
						});
						saveUserAndLogin(user, false);
					}
				});
		}
	}

	const removeUserData = () => {
		setLoginFormData(initialFormData);
		clearCache();
		deleteCredentials();
		setLoggedIn(false);
		navigation.navigate(ScreenEnum.Login);
		navigation.dispatch(DrawerActions.closeDrawer());
	}

	return { saveUserAndLogin, removeUserData, updateUser, loadUserData };
};

export default useEditUserData;