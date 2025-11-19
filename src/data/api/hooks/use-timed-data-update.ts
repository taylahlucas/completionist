import { useEffect } from 'react';
import { useMainState } from '@redux/hooks';
import { useEditUserData } from '@data/hooks/use-edit-user-data';
import { useAuthState } from '@redux/auth/hooks/use-auth-state';

export const useTimedDataUpdate = () => {
  const { user, shouldUpdateUser } = useMainState();
  const { isLoggedIn } = useAuthState();
  const { updateUserData } = useEditUserData();

  useEffect(() => {
    // Set up a timer to fetch data every 5 minutes (5 * 60 * 1000)
    const timerId = setInterval(() => {
      if (shouldUpdateUser && isLoggedIn) {
        updateUserData(user);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(timerId);
  }, []);
};
