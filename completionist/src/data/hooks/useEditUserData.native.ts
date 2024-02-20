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
import useMainState from '@redux/hooks/useMainState';

interface EditUserDataReturnType {
	loadUserData: () => void;
	saveUserAndLogin: (user: User) => void;
	saveUserAndSignUp: (user: User) => void;
	saveUserAndCache: (user: User) => void;
	removeUserData: () => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const navigation = useReactNavigation();
	const { setUser, setShouldUpdateUser } = useMainDispatch();
	const { shouldUpdateUser } = useMainState();
	const { setLoginFormData, setLoggedIn } = useLoginDispatch();
	const { saveToCache, fetchUserFromCache, clearCache } = useCache();
	const { getCredentials, deleteCredentials } = useKeychain();
	const { getUserByUserId, updateUser } = useEndpoints();

	const loadUserData = async () => {
		const credentials = await getCredentials();

		// Check if data is stored in cache, if not fetch from db and login
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

	// TODO: Refactor this
	const saveUserAndLogin = (user: User) => {
		setUser(user);
		saveToCache(user);
		setLoggedIn(true);
		navigation.navigate(ScreenEnum.GameSelection);
	};

	const saveUserAndSignUp = (user: User) => {
		setUser(user);
		saveToCache(user);
		setLoggedIn(true);
		navigation.navigate(ScreenEnum.SelectFirstGame);
	};

	const saveUserAndCache = (user: User) => {
		if (shouldUpdateUser) {
			updateUser({
				userId: user.userId,
				steamId: user.steamId,
				subscription: user.subscription,
				settings: user.settings,
				userAvatar: user.userAvatar,
				data: {
					fallout4: user.data.fallout4,
					skyrim: user.data.skyrim,
					witcher3: user.data.witcher3
				}
			});
			setShouldUpdateUser(false);
			setUser(user);
			saveToCache(user);
		}
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