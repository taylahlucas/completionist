import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import { Alert } from 'react-native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainState from '@redux/hooks/useMainState';
import { SignInProps } from '@data/api/EndpointInterfaces.native';
import useSendVerificationEmail from '@components/custom/LoginForm/hooks/useSendVerificationEmail';
import useLoginDispatch from './useLoginDispatch';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useRemoveUserData from '@data/hooks/useRemoveUserData.native';

interface GoogleSignInError {
	code: number;
	message: string;
}

interface GetLoginMethodsReturnType {
	checkUserAccount: ({ email, pw }: SignInProps) => Promise<void>;
	googleUserSignIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

const useGetLoginMethods = (): GetLoginMethodsReturnType => {
	const { t } = useTranslation();
	const { user, shouldUpdateUser } = useMainState();
	const { setLoggedIn, triggerIsSigningUp } = useLoginDispatch();
	const { saveUser } = useEditUserData();
	const { removeUserData } = useRemoveUserData();
	const { checkUserExists, linkAndSignIn, signIn, signUp } = useAuthEndpoints();
	const { updateUser } = useEndpoints();
	const sendVerification = useSendVerificationEmail();

	const userSignIn = async ({ email, pw, googleId }: SignInProps) => {
		await signIn({ email, pw, googleId })
			.then((userResponse) => {
				if (!!userResponse) {
					console.log("User sign in")
					saveUser(userResponse);
					setLoggedIn(true);
				}
			})
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
					onPress: (): Promise<void> => sendVerification(
						email,
						t('common:auth.linkAccountDesc'),
						UnauthorizedScreenEnum.LinkAccount
					)
				},
				{
					text: t('common:alerts.cancel')
				}
			]
		);
	};

	const checkUserAccount = async ({ email, pw }: SignInProps) => {
		// Only runs on regular sign in
		checkUserExists(email)
			.then((accounts) => {
				if (accounts.regular) {
					userSignIn({
						email,
						pw
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
											username: displayName,
											email: email,
											userAvatar: photoURL ?? undefined,
											googleId: idToken
										}
									})
										.then((response) => {
											if (!!response) {
												saveUser(response);
												triggerIsSigningUp(true);
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
				updateUser(user)
					.then(() => removeUserData());
			}
			else {
				removeUserData();
			}
			// TODO: Check if google is signed in
			// await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
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