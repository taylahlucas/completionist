import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from './useCache.native';
import useKeychain from './useKeychain.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { initialFormData } from '@redux/MainState';
import { CredentialsResponse } from '@utils/CustomTypes';
import { expectedDataKeys } from '@utils/constants';

interface SaveUserDataReturnType {
  loadUserData: () => void;
  saveUserData: (user: User) => void;
  removeUserData: () => void;
}

const useSaveUserData = (): SaveUserDataReturnType => {
  const navigation = useReactNavigation();
  const { setUser, setUserFormData, setLoggedIn } = useMainDispatch();
  const { fetchDataFromCache, saveToCache, clearCache } = useCache();
  const { getCredentials, deleteCredentials } = useKeychain();

  const validateGameData = (user: User): User => {
    let updatedUser: User = user;
    // Check if GeneralData contains all params
    for (const key of expectedDataKeys) {
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
    setUserFormData(initialFormData);
    clearCache();
    deleteCredentials();
    setLoggedIn(false);
    navigation.navigate(ScreenEnum.Login);
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return { saveUserData, removeUserData, loadUserData };
};

export default useSaveUserData;