import { useEffect } from 'react';
import { useEditUserData } from '@data/hooks/use-edit-user-data';
import { useAuthState } from '@redux/auth/hooks/use-auth-state';

export const useTimedDataUpdate = () => {
  const { user, isLoggedIn, shouldUpdateUser } = useAuthState();
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
};
