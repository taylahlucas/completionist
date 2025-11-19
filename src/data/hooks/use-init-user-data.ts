import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useEditUserData } from '@data/hooks';
import { useAuthDispatch } from '@redux/auth/hooks/use-auth-dispatch';
import { useAuthState } from '@redux/auth';

export const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { appState, shouldUpdateUser } = useAuthState();
  const { user } = useAuthState();
  const { setAppState } = useAuthDispatch();
  const { isLoggedIn } = useAuthState();
  const { updateUserData } = useEditUserData();

  useEffect(() => {
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
      case 'inactive':
        if (isLoggedIn && user && shouldUpdateUser) {
          updateUserData(user);
        }
        return;
    }
  }, [appState]);
};
