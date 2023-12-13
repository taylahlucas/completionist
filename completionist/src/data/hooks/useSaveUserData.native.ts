import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from './useCache.native';
import useKeychain from './useKeychain.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { initialFormData } from '@redux/MainState';

const useSaveUserData = () => {
  const navigation = useReactNavigation();
  const { setUser, setUserFormData, setLoggedIn } = useMainDispatch();
  const { saveToCache, clearCache } = useCache();
  const { storeCredentials, deleteCredentials } = useKeychain();

  const saveUserData = (user: User) => {
    storeCredentials({
      username: user.name,
      password: user.userId
    });
    setUser(user);
    saveToCache(user);
    setLoggedIn(true);
  };

  const removeUserData = () => {
    setUserFormData(initialFormData);
    clearCache();
    deleteCredentials();
    setLoggedIn(false);
    navigation.navigate(ScreenEnum.Login);
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return { saveUserData, removeUserData };
};

export default useSaveUserData;