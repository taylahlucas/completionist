import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { useEditUserData } from '@data/hooks/index';
import useLoginState from '@components/custom/LoginForm/provider/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useGetNavigationPath from '@navigation/hooks/useGetNavigationPath';
import { useLoadUserFromCache } from '@data/cache/hooks/useLoadUserFromCache';

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
