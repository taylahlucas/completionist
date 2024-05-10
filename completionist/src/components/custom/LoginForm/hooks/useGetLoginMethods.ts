import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import { Alert } from 'react-native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainState from '@redux/hooks/useMainState';
import { SignInProps } from '@data/api/EndpointInterfaces.native';
import useSendEmailVerification from '@components/custom/LoginForm/hooks/useSendEmailVerification';
import useLoginDispatch from './useLoginDispatch';

interface GoogleSignInError {
	code: number;
	message: string;
}

interface GetLoginMethodsReturnType {
	checkUserAccount: ({ email, password }: SignInProps) => Promise<void>;
	googleUserSignIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

const useGetLoginMethods = (): GetLoginMethodsReturnType => {
	const { t } = useTranslation();
	const { user, shouldUpdateUser } = useMainState();
	const { setIsAuthenticated } = useLoginDispatch();
	const { updateUserData, saveUser, removeUserData } = useEditUserData();
	const { checkUserExists, linkAndSignIn, signIn, signUp } = useEndpoints();
	const sendEmailVerification = useSendEmailVerification();

	const userSignIn = async ({ email, password, googleId }: SignInProps) => {
		try {
			await signIn({ email: email, password: password, googleId: googleId })
				.then((userResponse) => {
					if (!!userResponse) {
						setIsAuthenticated(true);
						saveUser(userResponse);
					}
				})
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error signing in: ", error.message)
		}
	}

	const linkGoogleAccount = ({ email, googleId }: SignInProps) => {
		Alert.alert(
			t('common:errors.accountExists'),
			t('common:errors.accountExistsMsg'),
			[
				{
					text: t('common:alerts.ok'),
					// Update user with googleId
					onPress: () => linkAndSignIn({
						email: email,
						googleId: googleId
					}).then((userResponse) => {
						if (!!userResponse) {
							saveUser(userResponse);
						}
					})
				},
				{
					text: t('common:alerts.cancel')
				}
			]
		);
	};

	const linkAccount = (email: string) => {
		Alert.alert(
			t('common:errors.accountExists'),
			t('common:errors.accountExistsMsg'),
			[
				{
					text: t('common:alerts.ok'),
					// Update user with password
					onPress: (): Promise<void> => sendEmailVerification(email, true)
				},
				{
					text: t('common:alerts.cancel')
				}
			]
		);
	};

	const checkUserAccount = async ({ email, password }: SignInProps) => {
		// Only runs on regular sign in
		checkUserExists(email)
			.then((accounts) => {
				if (accounts.regular) {
					userSignIn({
						email: email,
						password: password
					});
				}
				else if (accounts.google && !accounts.regular) {
					linkAccount(email);
				}
				else {
					Alert.alert(
						t('common:errors.emailNotFound'), 
						t('common:errors.checkCredentials')
					);
				}
			});
	}

	const googleUserSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const { idToken } = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);

			return auth()
				.signInWithCredential(googleCredential)
				.then((response): void => {
					const { displayName, email, uid, photoURL } = response?.user || {};
					if (displayName && email && idToken) {
						checkUserExists(email)
							.then((accounts) => {
								// If google account not linked
								if (accounts.regular && !accounts.google) {
									linkGoogleAccount({ email: email, googleId: idToken });
								}
								else if (accounts.google) {
									userSignIn({
										email: email,
										googleId: idToken
									});
								}
								else if (!accounts.google && !accounts.regular) {
									signUp({
										data: {
											userId: uid,
											name: displayName,
											email: email,
											userAvatar: photoURL ?? undefined,
											googleId: idToken
										}
									})
										.then((response) => {
											if (!!response) {
												saveUser(response);
											}
										})
								}
							});
					}
					else {
						Alert.alert(
							t('common:errors.googleSignIn'), 
							t('common:errors.googleSignInMsg')
						);
					}
				});
		} catch (error: GoogleSignInError | any) {
			console.log("Error with google sign in: ", error.message);
		}
	}

	const signOut = async () => {
		try {
			if (shouldUpdateUser) {
				updateUserData(user);
			}
			// await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			removeUserData();
		} catch (error) {
			console.log("Error signing out: ", error)
		}
	};

	return { 
		checkUserAccount,
		googleUserSignIn, 
		signOut 
	}
};

export default useGetLoginMethods;