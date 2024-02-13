import { Alert } from 'react-native';
import { requestCodes } from '@utils/constants';

const useHandleAxiosError = () => {
	const handleAxiosError = (status: number): void => {
		// TODO: Add translations
		switch (status) {
			case requestCodes.WRONG_PASSWORD:
				Alert.alert('Error', 'Incorrect password. Please try again.');
				break;
			case requestCodes.EMAIL_TAKEN:
				Alert.alert('Error', 'Email already exists.');
				break;
			case requestCodes.EMAIL_NOT_FOUND:
				Alert.alert('Email Not Found', 'Please check your credentials and try again.');
				break;
			case requestCodes.NOT_FOUND:
			case requestCodes.NO_USER_FOUND:
				// When searching for user in database && signing in
				break;
			default:
				Alert.alert(
					'Error',
					'Internal server error. Please refresh the app'
				);
				break;
		}
	};
	return { handleAxiosError };
}

export default useHandleAxiosError;