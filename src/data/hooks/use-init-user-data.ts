import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useEditUserData } from '@data/hooks';
import { useGetNavigationPath } from '@navigation/hooks';
import { useLoadUserFromCache } from '@data/cache/hooks';
import { useLoginDispatch, useLoginState } from '@features/login/provider';

export const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { user, appState, shouldUpdateUser } = useMainState();
  const { setIsAuthenticated } = useLoginDispatch();
  const { isAuthenticated, isLoggedIn, isSigningUp } = useLoginState();
  const { loadUserFromCache } = useLoadUserFromCache();
  const { updateUserData } = useEditUserData();
  const getAuthNavigationPath = useGetNavigationPath();

  useEffect(() => {
    if (!isAuthenticated && !user.userId) {
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
        if (!isAuthenticated || !user.userId) {
          loadUserFromCache();
        }
        return;
      case 'inactive':
        if (isAuthenticated && !!user.userId && shouldUpdateUser) {
          updateUserData(user);
        }
        return;
    }
  }, [appState]);

  useEffect(() => {
    if (isLoggedIn || isSigningUp) {
      setIsAuthenticated(
        user.signup.verification &&
          user.signup.selectGame &&
          user.signup.setUsername,
      );
    }

    if (!isAuthenticated && user.userId) {
      getAuthNavigationPath(user);
    }
  }, [isLoggedIn, isSigningUp, user.signup]);
};
