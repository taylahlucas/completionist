import { User } from '@utils/custom-interfaces';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetStore } from '@redux/reset-store';
import { selectAuthUser } from '@redux/reducer';

export const useAuthUser = (): User => {
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (!user) {
      // TODO: Test here
      resetStore(); // triggers navigation back to login
    }
  }, [user, resetStore]);

  if (!user) {
    // TODO: Log properly
    throw new Error('Auth user not set'); // helps TS narrow type
  }

  return user;
};
