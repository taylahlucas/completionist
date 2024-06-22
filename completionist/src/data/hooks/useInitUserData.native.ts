import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useEditUserData from './useEditUserData.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useGetNavigationPath from '@data/hooks/useGetNavigationPath';

const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { user, appState, shouldUpdateUser } = useMainState();
	const { setIsAuthenticated } = useLoginDispatch();
  const { isAuthenticated, isLoggedIn, isSigningUp } = useLoginState();
  const { loadUserFromCache, updateUserData } = useEditUserData();
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
  }, [])

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
			setIsAuthenticated(user.signup.verification && user.signup.selectGame)
		}

		if (!isAuthenticated && user.userId) {
			getAuthNavigationPath(user);
		}
	}, [isLoggedIn, isSigningUp, user.signup])
};

export default useInitUserData;