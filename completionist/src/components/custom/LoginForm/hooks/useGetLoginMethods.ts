import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import useLoginState from './useLoginState';
import { Alert } from 'react-native';
import useKeychain from '@data/hooks/useKeychain.native';
import useEditUserData from '@data/hooks/useEditUserData.native';

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
	const { loginFormData } = useLoginState();
	const { saveUserAndLogin, removeUserData } = useEditUserData();
	const { signIn, signUp, getUserByUserId } = useEndpoints();
	const { storeCredentials } = useKeychain();

	const createUser = async () => {
		try {
			const response = await signUp({ data: loginFormData });
			if (!!response) {
				saveUserAndLogin(response, true);
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
				await getUserByUserId({
					authToken: response.password, 
					userId: response.username
				})
					.then((userResponse) => {
						if (!!userResponse) {
							saveUserAndLogin(userResponse, true);
						}
					})
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
				.then((response) => {
					const { displayName, email, uid, photoURL } = response?.user || {};
					if (displayName && email && idToken) {
						storeCredentials({
							username: uid,
							password: idToken
						});
						// Check if user exists with userID
						// If yes, return user. If no, create user
						getUserByUserId({ authToken: idToken, userId: uid })
							.then((existingUser) => {
								if (!!existingUser) {
									saveUserAndLogin(existingUser, true);
								}
								else {
									signUp({
										data: {
											userId: uid,
											name: displayName,
											email: email,
											userAvatar: photoURL ?? undefined
										}
									})
										.then((response) => {
											if (!!response) {
												saveUserAndLogin(response, true);
											}
										})
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
		try {
			// TODO: Causing error
			// await GoogleSignin.revokeAccess();
			removeUserData();
			await GoogleSignin.signOut();
		} catch (error) {
			console.log("Error signing out: ", error)
		}
	};

	return { userSignIn, createUser, googleSignIn, signOut }
};

export default useGetLoginMethods;