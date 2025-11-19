import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useEditUserData } from '@data/hooks';
import { useLoginState } from '@features/login/provider';

export const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { user, appState, shouldUpdateUser } = useMainState();
  const { isLoggedIn } = useLoginState();
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
        if (isLoggedIn && !!user.userId && shouldUpdateUser) {
          updateUserData(user);
        }
        return;
    }
  }, [appState]);
};
