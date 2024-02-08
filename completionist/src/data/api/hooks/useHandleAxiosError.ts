import { Alert } from 'react-native';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import { requestCodes } from '@utils/constants';

const useHandleAxiosError = () => {
	const handleAxiosError = (error: AxiosErrorResponse): void => {
		switch (error.request.status) {
			case requestCodes.WRONG_PASSWORD:
				Alert.alert('Error', 'Incorrect password. Please try again.');
				break;
			case requestCodes.EMAIL_TAKEN:
				Alert.alert('Error', 'Email already exists.');
				break;
			case requestCodes.NO_USER_FOUND:
				// When signing in
				Alert.alert('User not found', 'Incorrect email or password.\nPlease try again.');
				break;
			case requestCodes.NOT_FOUND:
				// When searching for user in database
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