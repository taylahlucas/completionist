import { useMainDispatch } from '@redux/hooks';
import { deleteCredentials } from '@data/cache/keychain';
import { initialFormData, initialUser } from '@redux/main-state';
import { clearCache } from '../cache/local-cache';
import { useContentDispatch } from '@features/game-content/provider';
import { log } from '@utils/hooks';
import { ContentSectionEnum } from '@utils/index';
import { useLoginDispatch } from '@features/login';

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
