import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useEditUserData } from '@data/hooks';
import { useLoadUserFromCache } from '@data/cache/hooks';
import { useLoginState } from '@features/login/provider';

export const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { user, appState, shouldUpdateUser } = useMainState();
  const { isLoggedIn } = useLoginState();
  const loadUserFromCache = useLoadUserFromCache();
  const { updateUserData } = useEditUserData();

  useEffect(() => {
    if (!isLoggedIn && !user.userId) {
      loadUserFromCache();
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    switch (appState) {
      case 'active':
        if (!isLoggedIn || !user.userId) {
          loadUserFromCache();
        }
        return;
      case 'inactive':
        if (isLoggedIn && !!user.userId && shouldUpdateUser) {
          updateUserData(user);
        }
        return;
    }
  }, [appState]);
};
