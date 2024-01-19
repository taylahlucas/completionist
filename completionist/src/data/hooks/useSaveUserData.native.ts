import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from './useCache.native';
import useKeychain from './useKeychain.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { initialGameData } from '@redux/MainState';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import { CredentialsResponse } from '@utils/CustomTypes';
import { 
  expectedUserDataKeys, 
  expectedGeneralDataKeys,
  expectedSubscriptionDataKeys 
} from '@utils/constants';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';

interface SaveUserDataReturnType {
  loadUserData: () => void;
  saveUserData: (user: User) => void;
  removeUserData: () => void;
}

const useSaveUserData = (): SaveUserDataReturnType => {
  const navigation = useReactNavigation();
  const { setUser } = useMainDispatch();
  const { setLoginFormData, setLoggedIn } = useLoginDispatch();
  const { fetchDataFromCache, saveToCache, clearCache } = useCache();
  const { getCredentials, deleteCredentials } = useKeychain();

  const validateGameData = (user: User): User => {
    let updatedUser: User = user;
    // Check if UserData contains all params
    for (const key of expectedUserDataKeys) {
      if (!(key in user)) {
        if (!updatedUser.data[key]) {
          updatedUser.data[key] = initialGameData;
        }
        if (!updatedUser.data[key]) {
          updatedUser.data[key] = initialGameData;
        }
      }
    }
    // Check if all subscriptions are updated
    for (const key of expectedSubscriptionDataKeys) {
      if (!updatedUser.subscription.find(item => item.id === key)) {
        updatedUser.subscription.push({
          id: key,
          isActive: true
        })
      }
    }
    // Check if GeneralData contains all params
    for (const key of expectedGeneralDataKeys) {
      if (!(key in user)) {
        if (!updatedUser.data.skyrim[key]) {
          updatedUser.data.skyrim[key] = [];
        }
        if (!updatedUser.data.fallout4[key]) {
          updatedUser.data.fallout4[key] = [];
        }
      }
    }
    return updatedUser;
  };

  const loadUserData = () => {
    getCredentials()
      .then((credentials: CredentialsResponse) => {
        if (!!credentials?.password) {
          fetchDataFromCache(credentials.password)
            .then(cachedData => {
              if (!!cachedData) {
                saveUserData(cachedData);
              }
            });
        }
      });
  };

  const saveUserData = (user: User) => {
    setUser(validateGameData(user));
    saveToCache(validateGameData(user));
    setLoggedIn(true);
    navigation.navigate(ScreenEnum.Home);
  };

  const removeUserData = () => {
    setLoginFormData(initialFormData);
    clearCache();
    deleteCredentials();
    setLoggedIn(false);
    navigation.navigate(ScreenEnum.Login);
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return { saveUserData, removeUserData, loadUserData };
};

export default useSaveUserData;