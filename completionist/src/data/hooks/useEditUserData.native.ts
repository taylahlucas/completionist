import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { User } from '@utils/index';
import { fetchUserFromCache, saveToCache } from '../api/hooks/useCache.native';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';
import { useRemoveUserData, useKeychain } from '@data/hooks/index';

interface EditUserDataReturnType {
  loadUserFromCache: () => void;
  saveUser: (user: User) => void;
  updateUserData: (user: User) => void;
  deleteUserData: (userId: string) => void;
}

export const useEditUserData = (): EditUserDataReturnType => {
  const { t } = useTranslation();
  const { setUser, setShouldUpdateUser, setSelectedGameSettings } =
    useMainDispatch();
  const { selectedGame } = useMainState();
  const { setLoggedIn } = useLoginDispatch();
  const { getCredentials } = useKeychain();
  const { getUserByUserId, updateUser, deleteUser } = useEndpoints();
  const { removeUserData } = useRemoveUserData();

  const loadUserFromCache = async () => {
    const credentials = await getCredentials();
    // Check if data is stored in cache, if not fetch from db and login
    if (credentials) {
      fetchUserFromCache(credentials.password).then(cachedData => {
        if (!cachedData && credentials.username) {
          getUserByUserId({ userId: credentials.username }).then(user => {
            if (user) {
              // checkUpdateChangesLeft(user);
              saveUser(user);
              saveToCache(user);
              setLoggedIn(true);
              if (!selectedGame && user.gameData) {
                setSelectedGameSettings(user.gameData[0]?.id);
              }
            }
          });
        } else {
          if (cachedData) {
            // 	checkUpdateChangesLeft(cachedData);
            saveUser(cachedData);
            setLoggedIn(true);
            if (!selectedGame && cachedData.gameData) {
              setSelectedGameSettings(cachedData?.gameData[0]?.id);
            }
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
    updateUser(user).then(() => saveUser(user));
  };

  const deleteUserData = async (userId: string) => {
    Alert.alert(
      t('common:alerts.deleteConfirmation'),
      t('common:alerts.deleteConfirmationMessage'),
      [
        {
          text: t('common:alerts.cta.deleteAccount'),
          style: 'destructive',
          onPress: () =>
            deleteUser(userId).then(() => {
              Alert.alert(t('common:alerts.deleteSuccess'));
              removeUserData();
            }),
        },
        {
          text: t('common:alerts.cta.cancel'),
        },
      ],
    );
  };

  return {
    loadUserFromCache,
    saveUser,
    updateUserData,
    deleteUserData,
  };
};

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
