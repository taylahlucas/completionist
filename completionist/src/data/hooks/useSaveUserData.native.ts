import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from './useCache.native';
import useKeychain from './useKeychain.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import { CredentialsResponse } from '@utils/CustomTypes';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEndpoints from './useEndpoints';

interface SaveUserDataReturnType {
  loadUserData: () => void;
  saveUserData: (user: User) => void;
  updateUser: (user: User) => void;
  removeUserData: () => void;
}

const useSaveUserData = (): SaveUserDataReturnType => {
  const navigation = useReactNavigation();
  const { setUser } = useMainDispatch();
  const { setLoginFormData, setLoggedIn } = useLoginDispatch();
  const { fetchDataFromCache, saveToCache, clearCache } = useCache();
  const { getCredentials, deleteCredentials } = useKeychain();
  const { updateUserData } = useEndpoints();

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
    setUser(user);
    saveToCache(user);
    setLoggedIn(true);
    navigation.navigate(ScreenEnum.Home);
  };

  const updateUser = (user: User) => {
    saveUserData(user);
    updateUserData({
      userId: user.userId,
      subscription: user.subscription,
      settings: user.settings,
      skyrimData: user.data?.skyrim,
      fallout4Data: user.data?.fallout4
    });
  } 

  const removeUserData = () => {
    setLoginFormData(initialFormData);
    clearCache();
    deleteCredentials();
    setLoggedIn(false);
    navigation.navigate(ScreenEnum.Login);
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return { saveUserData, updateUser, removeUserData, loadUserData };
};

export default useSaveUserData;