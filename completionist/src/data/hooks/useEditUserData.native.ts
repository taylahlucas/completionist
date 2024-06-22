import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from '../api/hooks/useCache.native';
import useKeychain from './useKeychain.native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import { initialUser } from '@redux/MainState';
import useGetNavigationPath from './useGetNavigationPath';
// import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface EditUserDataReturnType {
	loadUserFromCache: () => void;
	saveUser: (user: User) => void;
	updateUserData: (user: User) => void;
	removeUserData: () => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const { setUser, setShouldUpdateUser  } = useMainDispatch();
	const { isAuthenticated } = useLoginState();
	const { setLoginFormData, setLoggedIn, setIsAuthenticated } = useLoginDispatch();
	const { fetchUserFromCache, saveToCache, clearCache } = useCache();
	const { getCredentials, deleteCredentials } = useKeychain();
	const { getUserByUserId, updateUser } = useEndpoints();
	const getAuthNavigationPath = useGetNavigationPath();

	// const checkUpdateChangesLeft = (user: User) => {
	// 	const currentDate = new Date();
	// 	// Refresh changesLeft value on the 1st of each month
	// 	if (currentDate.getDate() === 1 && user.subscription.tier === SubscriptionTypeEnum.FREE) {
	// 		if (user.subscription.changesLeft !== 1) {
	// 			const updatedUser = {
	// 				...user,
	// 				subscription: {
	// 					...user.subscription,
	// 					changesLeft: 1
	// 				}
	// 			};
	// 			updateUser({ ...updatedUser })
	// 				.then(() => {
	// 					saveUser(updatedUser);
	// 				});
	// 		}
  //   }
	// 	else {
	// 		saveUser(user);
	// 	}
	// };

	const loadUserFromCache = async () => {
		const credentials = await getCredentials();

		// Check if data is stored in cache, if not fetch from db and login
		if (credentials) {
			fetchUserFromCache(credentials.password)
				.then((cachedData) => {
					getUserByUserId({ userId: credentials.username })
							.then((user) => {
								if (user) {
									// checkUpdateChangesLeft(user);
									saveUser(user);
								}
							})
					// if (cachedData) {
					// 	checkUpdateChangesLeft(cachedData);
					// }
					// else {
					// 	getUserByUserId({ userId: credentials.username })
					// 		.then((user) => {
					// 			if (user) {
					// 				checkUpdateChangesLeft(user);
					// 			}
					// 		})
					// }
			});
		}
	};

	const checkAuthentication = (user: User) => {
		setIsAuthenticated(user.signup.verification && user.signup.selectGame)
	};

	const saveUser = (user: User) => {
		checkAuthentication(user);
		setUser(user);
		saveToCache(user);
		setShouldUpdateUser(false);
		
		if (!isAuthenticated) {
			getAuthNavigationPath(user);
		}
	};

	const updateUserData = async (user: User) => {
		updateUser(user)
			.then(() => saveUser(user));
	}

	const removeUserData = () => {
		setLoggedIn(false);
		setIsAuthenticated(false);
		setUser(initialUser);
		setLoginFormData(initialFormData);
		clearCache();
		deleteCredentials();
	}

	return { 
		loadUserFromCache,
		saveUser,
		updateUserData,
		removeUserData
	};
};

export default useEditUserData;