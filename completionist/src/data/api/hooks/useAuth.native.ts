import useKeychain from '@data/hooks/useKeychain.native';

const useAuth = () => {
	const { storeCredentials, getCredentials } = useKeychain();

	const getAuthToken = async (): Promise<string> => {
		return await getCredentials()
			.then((token) => !!token ? token?.password : '');
	  };

	const setAuthHeaders = (token: string) => {
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

	return { setAuthHeaders, setCredentials, getAuthToken };
};

export default useAuth;