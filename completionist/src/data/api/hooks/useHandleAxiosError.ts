import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { requestCodes } from '@utils/constants';

const useHandleAxiosError = () => {
	const { t } = useTranslation();
	
	const handleAxiosError = (status: number): void => {
		// TODO: Add translations
		switch (status) {
			case requestCodes.WRONG_PASSWORD:
				Alert.alert(t('common:errors.error'), 'Incorrect password. Please try again.');
				break;
			case requestCodes.EMAIL_TAKEN:
				Alert.alert(t('common:errors.error'), 'Email already exists.');
				break;
			case requestCodes.EMAIL_NOT_FOUND:
				Alert.alert('Email Not Found', 'Please check your credentials and try again.');
				break;
			case requestCodes.NOT_FOUND:
			case requestCodes.NO_USER_FOUND:
				// When searching for user in database && signing in
				break;
			case requestCodes.UNAUTHORIZED:
				Alert.alert('Unauthorized', 'You are unauthorized to use this account. Please try logging in again.');
				break;
			default:
				Alert.alert(
					t('common:errors.error'),
					t('common:errors.pleaseRefreshApp')
				);
				break;
		}
	};
	return { handleAxiosError };
}

export default useHandleAxiosError;