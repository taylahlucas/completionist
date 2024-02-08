import useKeychain from '@data/hooks/useKeychain.native';
import { CredentialsResponse, UserResponse } from '@utils/CustomTypes';

const useAuth = () => {
	const { storeCredentials, getCredentials } = useKeychain();

	const setAuthHeaders = (token: Promise<CredentialsResponse>) => {
		return {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	};

	const setCredentials = (userId: string, token: string) => {
		if (!!userId && !!token) {
			storeCredentials({
				username: userId,
				password: token
			});
		 }
	}

	const withToken = (apiFunction: (...args: any[]) => Promise<UserResponse>) => async (...args: any[]) => {
		const token = getCredentials();
		if (!!token) {
		  const response = await apiFunction(...args.concat(setAuthHeaders(token)));
		  return response as UserResponse;
		} else {
		  console.log('Could not get token');
		  return;
		}
	  };

	return { setAuthHeaders, setCredentials, withToken };
};

export default useAuth;