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
import { initialUser } from '@redux/MainState';

interface EditUserDataReturnType {
	loadUserFromCache: () => void;
	saveUserAndLogin: (user: User, shouldLogin: boolean) => void;
	updateUserData: (user: User) => void;
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
		}
	};
	
	const updateUserData = async (user: User) => {
		console.log("isLoggedIn: ", isLoggedIn)
		if (isLoggedIn) {
			await getCredentials()
				.then((credentials) => {
					// TODO: Problem with credentials
					console.log("credentials: " , credentials)
					if (!!credentials) {
						console.log("UPDATING USER==1")
						updateUser({
							authToken: credentials.password,
							userId: user.userId,
							steamId: user.steamId,
							signup: user.signup,
							subscription: user.subscription,
							settings: user.settings,
							userAvatar: user.userAvatar,
							data: {
								skyrim: user.data.skyrim,
								fallout4: user.data.fallout4,
								witcher3: user.data.witcher3
							}
						});
						saveUserAndLogin(user, false);
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