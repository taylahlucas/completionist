import { useEffect, useRef } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { AppState } from 'react-native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useEditUserData from './useEditUserData.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';

const useInitUserData = () => {
  const appStateRef = useRef(AppState.currentState);
  const { setAppState } = useMainDispatch();
  const { user, appState, shouldUpdateUser } = useMainState();
  const { isLoggedIn, isAuthenticated } = useLoginState();
  const { loadUserFromCache, updateUserData } = useEditUserData();

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
					console.log("UPDATING: ", user.data.witcher3.quests)
          updateUserData(user);
        }
        return;
    }
  }, [appState]);
};

export default useInitUserData;