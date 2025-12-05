import { useEffect, useRef } from 'react';
import { useEditUserData } from '@data/hooks/use-edit-user-data';
import { useAuthState } from '@redux/auth/hooks/use-auth-state';
import { useMainState } from '@redux/hooks';
import { AppState } from 'react-native';
import { useAuthDispatch } from '@redux/auth';
import { User } from '../generated';

export const useTimedDataUpdate = (isLoggedIn: boolean, user?: User) => {
  const appStateRef = useRef(AppState.currentState);
  const { appState } = useAuthState();
  const { setAppState } = useAuthDispatch();
  // TODO: Find another way to handle if user should be updated?
  const { shouldUpdateUser } = useMainState();
  const { updateUserData } = useEditUserData();

  useEffect(() => {
    // Set up a timer to fetch data every 5 minutes (5 * 60 * 1000)
    const timerId = setInterval(() => {
      if (user && shouldUpdateUser && isLoggedIn) {
        updateUserData(user);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(timerId);
  }, []);

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
