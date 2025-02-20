import { Alert } from 'react-native';
import { requestCodes } from '@utils/constants';
import i18next from 'i18next';

export const handleAxiosError = (status?: number): void => {
  if (!status) {
    return;
  }
  switch (status) {
    case requestCodes.WRONG_PASSWORD:
      Alert.alert(
        i18next.t('common:errors.error'),
        i18next.t('common:errors.incorrectPw'),
      );
      break;
    case requestCodes.EMAIL_TAKEN:
      Alert.alert(
        i18next.t('common:errors.error'),
        i18next.t('common:errors.emailAlreadyExists'),
      );
      break;
    case requestCodes.EMAIL_NOT_FOUND:
      Alert.alert(
        i18next.t('common:errors.emailNotFound'),
        i18next.t('common:errors.checkCredentials'),
      );
      break;
    case requestCodes.UNAUTHORIZED:
      // TODO: Ensure user data is removed on unauthorized
      // removeUserData();
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
