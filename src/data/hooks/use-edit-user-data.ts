import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMainDispatch } from '@redux/hooks';
import { User } from '@utils/index';
import { updateUser, deleteUser } from '@data/index';
import { resetStore } from '@redux/reset-store';

interface EditUserDataReturnType {
  saveUser: (user: User) => void;
  updateUserData: (user: User) => void;
  deleteUserData: (userId: string) => void;
}

export const useEditUserData = (): EditUserDataReturnType => {
  const { t } = useTranslation();
  const { setUser, setShouldUpdateUser } = useMainDispatch();

  // Save user locally without calling api
  const saveUser = (user: User) => {
    setUser(user);
    // TODO: Do we need this?
    setShouldUpdateUser(false);
  };

  // Updated user in db
  const updateUserData = async (user: User) => {
    updateUser(user).then(() => saveUser(user));
  };

  const deleteUserData = async (userId: string) => {
    Alert.alert(
      t('common:alerts.deleteConfirmation'),
      t('common:alerts.deleteConfirmationMessage'),
      [
        {
          text: t('common:alerts.cta.deleteAccount'),
          style: 'destructive',
          onPress: () =>
            deleteUser(userId).then(() => {
              Alert.alert(t('common:alerts.deleteSuccess'));
              resetStore();
            }),
        },
        {
          text: t('common:alerts.cta.cancel'),
        },
      ],
    );
  };

  return {
    saveUser,
    updateUserData,
    deleteUserData,
  };
};
