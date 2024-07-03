import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from '../api/hooks/useCache.native';
import useKeychain from './useKeychain.native';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';

interface EditUserDataReturnType {
	loadUserFromCache: () => void;
	saveUser: (user: User) => void;
	updateUserData: (user: User) => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const { setUser, setShouldUpdateUser } = useMainDispatch();
	const { setLoggedIn } = useLoginDispatch();
	const { fetchUserFromCache, saveToCache } = useCache();
	const { getCredentials } = useKeychain();
	const { getUserByUserId, updateUser } = useEndpoints();

	const loadUserFromCache = async () => {
		const credentials = await getCredentials();
		// Check if data is stored in cache, if not fetch from db and login
		if (credentials) {
			fetchUserFromCache(credentials.password)
				.then((cachedData) => {
					if (!cachedData) {
						getUserByUserId({ userId: credentials.username })
							.then((user) => {
								if (user) {
									// checkUpdateChangesLeft(user);
									saveUser(user);
								}
							})
					}
					else {
						// 	checkUpdateChangesLeft(cachedData);
						saveUser(cachedData);
						setLoggedIn(true);
					}
			});
		}
	};

	const saveUser = (user: User) => {
		setUser(user);
		saveToCache(user);
		setShouldUpdateUser(false);
	};

	const updateUserData = async (user: User) => {
		updateUser(user)
			.then(() => saveUser(user));
	}

	return { 
		loadUserFromCache,
		saveUser,
		updateUserData
	};
};

export default useEditUserData;

// import { SubscriptionTypeEnum } from '@utils/CustomEnums';
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