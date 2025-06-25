import { useEditUserData } from '@data/hooks/index';
import { useMainState } from '@redux/hooks';
import { useState } from 'react';

export const useSetUsername = () => {
  const { user } = useMainState();
  const [username, setUsername] = useState<string>('');
  const { updateUserData } = useEditUserData();

  return {
    viewModel: {
      user,
      username,
    },
    actions: {
      setUsername,
      updateUserData,
    },
  };
};
