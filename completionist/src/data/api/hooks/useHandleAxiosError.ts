import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { requestCodes } from '@utils/constants';
import { useRemoveUserData } from '@data/hooks/index';

const useHandleAxiosError = () => {
  const { t } = useTranslation();
  const { removeUserData } = useRemoveUserData();

  const handleAxiosError = (status?: number): void => {
    if (!status) {
      return;
    }
    switch (status) {
      case requestCodes.WRONG_PASSWORD:
        Alert.alert(t('common:errors.error'), t('common:errors.incorrectPw'));
        break;
      case requestCodes.EMAIL_TAKEN:
        Alert.alert(
          t('common:errors.error'),
          t('common:errors.emailAlreadyExists'),
        );
        break;
      case requestCodes.EMAIL_NOT_FOUND:
        Alert.alert(
          t('common:errors.emailNotFound'),
          t('common:errors.checkCredentials'),
        );
        break;
      case requestCodes.UNAUTHORIZED:
        removeUserData();
        break;
      case requestCodes.NO_USER_FOUND:
        // When searching for user in database && signing in
        break;
      default:
        // Alert.alert(
        // 	t('common:errors.error'),
        // 	t('common:errors.pleaseRefreshApp')
        // );
        break;
    }
  };
  return { handleAxiosError };
};

export default useHandleAxiosError;
