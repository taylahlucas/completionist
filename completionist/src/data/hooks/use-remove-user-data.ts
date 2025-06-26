import { useMainDispatch } from '@redux/hooks';
import { deleteCredentials } from '@data/cache/keychain';
import { initialUser } from '@redux/main-state';
import { clearCache } from '../cache/local-cache';
import {
  initialFormData,
  useLoginDispatch,
} from '@components/custom/login-form/provider';
import { useContentDispatch } from '@components/custom/content-list/provider';
import { log } from '@utils/hooks';
import { ContentSectionEnum } from '@utils/index';

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
