import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from '../api/hooks/useCache.native';
import useKeychain from './useKeychain.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';
import { initialUser } from '@redux/MainState';

interface EditUserDataReturnType {
	loadUserData: () => void;
	saveUserAndLogin: (user: User) => void;
	saveUserAndSignUp: (user: User) => void;
	saveUserAndCache: (user: User, updateInfo: boolean, updateData: boolean) => void;
	removeUserData: () => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const navigation = useReactNavigation();
	const { setUser } = useMainDispatch();
	const { setLoginFormData, setLoggedIn } = useLoginDispatch();
	const { saveToCache, fetchUserFromCache, clearCache } = useCache();
	const { getCredentials, deleteCredentials } = useKeychain();
	const { getUserByUserId, updateUserInfo, updateUserData } = useEndpoints();

	const loadUserData = async () => {
		const credentials = await getCredentials();

		if (!!credentials) {
			fetchUserFromCache(credentials.password)
				.then((cachedData) => {
					if (!!cachedData) {
						saveUserAndLogin(cachedData);
					}
					else {
						getUserByUserId({ userId: credentials.username })
							.then((user) => {
								if (!!user) {
									saveUserAndLogin(user);
								}
							})
					}
			});
		}
	};

	const saveUserAndLogin = (user: User) => {
		setUser(user);
		setLoggedIn(true);
		navigation.navigate(ScreenEnum.GameSelection);
	};

	const saveUserAndSignUp = (user: User) => {
		setUser(user);
		setLoggedIn(true);
		navigation.navigate(ScreenEnum.SelectFirstGame);
	};

	const saveUserAndCache = (user: User, updateInfo: boolean, updateData: boolean) => {
		if (updateInfo) {
			updateUserInfo({
				userId: user.userId,
				steamId: user.steamId,
				subscription: user.subscription,
				settings: user.settings,
				userAvatar: user.userAvatar
			});
		}
		if (updateData) {
			updateUserData({
				userId: user.userId,
				data: {
					fallout4: user.data.fallout4,
					skyrim: user.data.skyrim,
					witcher3: user.data.witcher3
				}
			});
		}
		setUser(user);
		saveToCache(user);
	};

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
		saveUserAndSignUp, 
		saveUserAndCache,
		removeUserData, 
		loadUserData 
	};
};

export default useEditUserData;