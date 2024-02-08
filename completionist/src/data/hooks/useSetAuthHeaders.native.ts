import { UserCredentials } from 'react-native-keychain';

type UserCredentialsReturnType = Promise<UserCredentials | null>;

const useSetAuthHeaders = () => {
	const setAuthHeaders = (token: UserCredentialsReturnType) => {
		return {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	};

	return { setAuthHeaders };
};

export default useSetAuthHeaders;