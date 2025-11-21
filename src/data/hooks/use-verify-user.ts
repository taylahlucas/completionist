import { User } from '@utils/index';
import { useEditUserData } from './use-edit-user-data';
import { useMainDispatch, useMainState } from '@redux/hooks';
import { useGetNavigationPath } from '@navigation/hooks';

export const useVerifyUser = () => {
  const { selectedGameData } = useMainState();
  const { setSelectedGameDataSettings } = useMainDispatch();
  const { saveUser } = useEditUserData();
  const getNavigationPath = useGetNavigationPath();

  const handleUserVerification = (user: User) => {
    const isVerified = Object.values(user.signup).every(
      value => value === true,
    );
    saveUser(user);
    if (isVerified) {
      if (!selectedGameData && user.gameData) {
        setSelectedGameDataSettings(user.gameData[0]?.id);
      }
    } else {
      getNavigationPath(user);
    }
  };

  return handleUserVerification;
};
