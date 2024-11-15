import { useTranslation } from 'react-i18next';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from '../api/hooks/useCache.native';
import useKeychain from './useKeychain.native';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';
import useRemoveUserData from '@data/hooks/useRemoveUserData.native';
import { Alert } from 'react-native';

interface EditUserDataReturnType {
	loadUserFromCache: () => void;
	saveUser: (user: User) => void;
	updateUserData: (user: User) => void;
	deleteUserData: (userId: string) => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const { t } = useTranslation();
	const { setUser, setShouldUpdateUser } = useMainDispatch();
	const { setLoggedIn } = useLoginDispatch();
	const { fetchUserFromCache, saveToCache } = useCache();
	const { getCredentials } = useKeychain();
	const { getUserByUserId, updateUser, deleteUser } = useEndpoints();
	const { removeUserData } = useRemoveUserData();

	const loadUserFromCache = async () => {
		const credentials = await getCredentials();
		// Check if data is stored in cache, if not fetch from db and login
		if (credentials) {
			fetchUserFromCache(credentials.password)
				.then((cachedData) => {
					if (!cachedData && credentials.username) {
						getUserByUserId({ userId: credentials.username })
							.then((user) => {
								if (user) {
									// checkUpdateChangesLeft(user);
									saveUser(user);
									saveToCache(user);
									setLoggedIn(true);
								}
							})
					}
					else {
						if (cachedData) {
							// 	checkUpdateChangesLeft(cachedData);
							saveUser(cachedData);
							setLoggedIn(true);
						}
					}
				});
		}
	};

	const saveUser = (user: User) => {
		setUser(user);
		setShouldUpdateUser(false);
	};

	const updateUserData = async (user: User) => {
		updateUser(user)
			.then(() => saveUser(user));
	}

	// TODO: Add to translations
	const deleteUserData = async (userId: string) => {
		Alert.alert(
			'Are you sure?',
			'If you delete this account, you will not be able to recover it.',
			[
				{
					text: 'Delete Account',
					style: 'destructive',
					onPress: () => deleteUser(userId)
						.then(() => {
							Alert.alert('Account successfully deleted.');
							removeUserData();
						})
				},
				{
					text: t('common:alerts.cancel')
				}
			]
		)
	};

	return {
		loadUserFromCache,
		saveUser,
		updateUserData,
		deleteUserData
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