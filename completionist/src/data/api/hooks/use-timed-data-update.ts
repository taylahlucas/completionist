import { useEffect } from 'react';
import { useMainState } from '@redux/hooks';
import useLoginState from '@components/custom/LoginForm/provider/useLoginState';
import { useEditUserData } from '@data/hooks/use-edit-user-data';

const useTimedDataUpdate = () => {
  const { user, shouldUpdateUser } = useMainState();
  const { isAuthenticated } = useLoginState();
  const { updateUserData } = useEditUserData();

  useEffect(() => {
    // Set up a timer to fetch data every 5 minutes (5 * 60 * 1000)
    const timerId = setInterval(() => {
      if (shouldUpdateUser && isAuthenticated) {
        updateUserData(user);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(timerId);
  }, []);
};

export default useTimedDataUpdate;
