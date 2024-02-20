import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import useLoginState from './useLoginState';
import { Alert } from 'react-native';
import useKeychain from '@data/hooks/useKeychain.native';
import { useTranslation } from 'react-i18next';
import { LoginFormData } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';

interface GoogleSignInError {
	code: number;
	message: string;
}

interface GetLoginMethodsReturnType {
	userSignIn: () => Promise<void>
	createUser: () => Promise<void>;
	googleSignIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

const useGetLoginMethods = (): GetLoginMethodsReturnType => {
	const { t } = useTranslation();
	const { user } = useMainState();
	const { loginFormData } = useLoginState();
	const { saveUserAndLogin, saveUserAndSignUp, saveUserAndCache, removeUserData } = useEditUserData();
	const { signIn, signUp, getUserByUserId } = useEndpoints();
	const { storeCredentials } = useKeychain();

	const createUser = async (user?: LoginFormData) => {
		try {
			const response = await signUp({ data: !!user ? user : loginFormData });
			if (!!response) {
				saveUserAndSignUp(response);
			}
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error creating user: ", error.message)
		}
	};

	const userSignIn = async () => {
		try {
			const response = await signIn({ email: loginFormData.email, password: loginFormData.password ?? '' });
			if (!!response) {
				saveUserAndLogin(response);
			}
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error signing in: ", error.message)
		}
	}

	const googleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const { idToken } = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);

			return auth()
				.signInWithCredential(googleCredential)
				.then((response): void => {
					const { displayName, email, uid, photoURL } = response?.user || {};
					if (displayName && email && idToken) {
						storeCredentials({
							username: uid,
							password: idToken
						});
						// Check if user exists with userID
						// If yes, return user. If no, create user
						getUserByUserId({ userId: uid })
							.then((existingUser) => {
								if (!!existingUser) {
									saveUserAndLogin(existingUser);
								}
								else {
									createUser({
										userId: uid,
										name: displayName,
										email: email,
										userAvatar: photoURL ?? undefined
									});
								}
							});
					}
					else {
						Alert.alert(t('common:errors.googleSignIn'), t('common:errors.noEmailExists'));
					}
				});
		} catch (error: GoogleSignInError | any) {
			console.log("Error with google sign in: ", error.message);
		}
	}

	const signOut = async () => {
		saveUserAndCache(user, true, true);
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			removeUserData();
		} catch (error) {
			console.log("Error signing out: ", error)
		}
	};

	return { userSignIn, createUser, googleSignIn, signOut }
};

export default useGetLoginMethods;