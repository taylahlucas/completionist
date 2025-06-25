import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useMainDispatch from '@redux/hooks/use-main-dispatch';
import { deleteCredentials } from '@data/cache/keychain';
import { initialUser } from '@redux/main-state';
import { clearCache } from '../cache/localCache';
import { initialFormData } from '@components/custom/LoginForm/provider/LoginState';
import useContentDispatch from '@components/custom/ContentList/provider/useContentDispatch';
import { log } from '@utils/hooks/index';
import { ContentSectionEnum } from '@utils/CustomEnums';

export const useRemoveUserData = () => {
  const { setUser, setSelectedGame } = useMainDispatch();
  const {
    setLoginFormData,
    triggerIsSigningUp,
    setLoggedIn,
    setVerificationToken,
    setIsAuthenticated,
  } = useLoginDispatch();
  const { setSelectedCategory, setSelectedSection } = useContentDispatch();

  const removeUserData = () => {
    log({
      title: 'Removing User Data',
    });
    setVerificationToken('');
    setSelectedCategory({
      category: '',
    });
    setSelectedSection(ContentSectionEnum.QUESTS);
    setIsAuthenticated(false);
    setLoggedIn(false);
    setLoginFormData(initialFormData);
    triggerIsSigningUp(false);
    setUser(initialUser);
    setSelectedGame(undefined);
    clearCache();
    deleteCredentials();
  };

  return { removeUserData };
};
