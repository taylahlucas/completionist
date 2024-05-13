import useMainDispatch from '@redux/hooks/useMainDispatch';
import { User } from '@utils/CustomInterfaces';
import useCache from '../api/hooks/useCache.native';
import useKeychain from './useKeychain.native';
import { initialFormData } from '@components/custom/LoginForm/LoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useEndpoints from '../api/hooks/useEndpoints.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import { initialUser } from '@redux/MainState';
import useGetNavigationPath from './useGetNavigationPath';

interface EditUserDataReturnType {
	loadUserFromCache: () => void;
	saveUser: (user: User) => void;
	updateUserData: (user: User) => void;
	updateSignUpData: (user: User) => void;
	removeUserData: () => void;
}

const useEditUserData = (): EditUserDataReturnType => {
	const { setUser, setShouldUpdateUser  } = useMainDispatch();
	const { isAuthenticated } = useLoginState();
	const { setLoginFormData, setLoggedIn, setIsAuthenticated } = useLoginDispatch();
	const { fetchUserFromCache, saveToCache, clearCache } = useCache();
	const { getCredentials, deleteCredentials } = useKeychain();
	const { getUserByUserId, updateUser, updateSignUp } = useEndpoints();
	const getAuthNavigationPath = useGetNavigationPath();

	const loadUserFromCache = async () => {
		const credentials = await getCredentials();

		// Check if data is stored in cache, if not fetch from db and login
		if (credentials) {
			fetchUserFromCache(credentials.password)
				.then((cachedData) => {
					if (cachedData) {
						saveUser(cachedData);
					}
					else {
						getUserByUserId({ authToken: credentials.password, userId: credentials.username })
							.then((user) => {
								if (user) {
									saveUser(user);
								}
							})
					}
			});
		}
	};

	const checkAuthentication = (user: User) => {
		setIsAuthenticated(user.signup.verification && user.signup.selectPlan && user.signup.selectGame)
	};

	const saveUser = (user: User) => {
		checkAuthentication(user);
		setUser(user);
		saveToCache(user);
		setShouldUpdateUser(false);

		if (!isAuthenticated) {
			getAuthNavigationPath(user);
		}
	};

	const updateSignUpData = async (user: User) => {
		await getCredentials()
			.then((credentials) => {
				if (!!credentials) {
					updateSignUp({
						authToken: credentials.password,
						userId: user.userId,
						signup: user.signup
					});
					saveUser(user);
				}
			})
	}
	
	const updateUserData = async (user: User) => {
		await getCredentials()
			.then((credentials) => {
				if (!!credentials) {
					updateUser({
						authToken: credentials.password,
						...user
					});
					saveUser(user);
				}
			})
	}

	const removeUserData = () => {
		setIsAuthenticated(false);
		setUser(initialUser);
		setLoginFormData(initialFormData);
		clearCache();
		deleteCredentials();
		setLoggedIn(false);
	}

	return { 
		saveUser,
		updateSignUpData,
		updateUserData,
		removeUserData, 
		loadUserFromCache 
	};
};

export default useEditUserData;