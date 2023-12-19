import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useEndpoints from './useEndpoints';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useSaveUserData from './useSaveUserData.native';

const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { isLoggedIn, user, appState } = useMainState();
  const { updateUserData } = useEndpoints();
  const { loadUserData, saveUserData } = useSaveUserData();

  useEffect(() => {
    if (!isLoggedIn && !user.userId) {
      loadUserData();
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
        if (!isLoggedIn || !user.userId) {
          loadUserData();
        }
        return;
      case 'inactive': 
        if (isLoggedIn && !!user.userId) {
          saveUserData(user);
          updateUserData({
            userId: user.userId,
            skyrimData: user.data?.skyrim,
            fallout4Data: user.data?.fallout4
          });
        }
        return;
    }
  }, [appState]);
};

export default useInitUserData;