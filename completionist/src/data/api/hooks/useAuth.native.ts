import { useEffect, useState } from 'react';
import useKeychain from '@data/hooks/useKeychain.native';
import { CredentialsResponse, UserResponse } from '@utils/CustomTypes';

const useAuth = () => {
	const { storeCredentials, getCredentials } = useKeychain();
	const [authToken, setAuthToken] = useState('');

	useEffect(() => {
		getAuthToken()
			.then((token) => {
				if (!!token) {
					setAuthToken(token)
				}
			});
	}, [])

	const getAuthToken = async () => {
		return await getCredentials()
			.then((token) => !!token ? token?.password : null);
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

	// const withToken = (apiFunction: (args: any) => Promise<UserResponse>) => async (args: any) => {
	// 	if (!!authToken) {
	// 	  return await apiFunction(args);
	// 	} else {
	// 	  console.log('Could not get token');
	// 	  return;
	// 	}
	//   };

	return { setAuthHeaders, setCredentials, getAuthToken, authToken };
};

export default useAuth;