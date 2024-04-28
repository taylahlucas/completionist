import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import { Alert } from 'react-native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainState from '@redux/hooks/useMainState';
import { SignInProps } from '@data/api/EndpointInterfaces.native';
import { LoginFormData } from '@utils/CustomInterfaces';
import useLoginDispatch from './useLoginDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

interface GoogleSignInError {
	code: number;
	message: string;
}

interface GetLoginMethodsReturnType {
	sendEmailVerification: (email: string) => Promise<void>;
	checkUserAccount: ({ email, password }: SignInProps) => Promise<void>;
	userSignIn: ({ email, password, googleId }: SignInProps) => Promise<void>;
	createUser: (data: LoginFormData) => Promise<void>;
	googleUserSignIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

const useGetLoginMethods = (): GetLoginMethodsReturnType => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const { setVerificationToken } = useLoginDispatch();
	const { updateUserData, saveUserAndLogin, removeUserData } = useEditUserData();
	const { sendEmail, checkUserExists, linkAndSignIn, signIn, signUp } = useEndpoints();

	const sendEmailVerification = async (email: string) => {
		try {
			// TODO: Algorithm to generate unique code
			const uniqueCode = 'ANC234';
			setVerificationToken(uniqueCode);
			sendEmail({
				// TODO: Swap for completionist email
				emailTo: email,
				subject: t('common:screens.verifyAccount'),
				text: t(
					'common:sendRequest.verifyAccount',
					{
						code: uniqueCode
					}
				)
			})
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error sending verification email ", error.message)
		}
		console.log("NAVIGATING")
		navigation.navigate(ScreenEnum.AccountVerification);
	};

	const createUser = async (data: LoginFormData) => {
		try {
			const response = await signUp({ data: data });
			if (!!response) {
				saveUserAndLogin(response, false);
				// TODO: Track which part of the signup flow the user is in?
				// Should i cache the page? or create variable in database for login i.e.
				// { verified: true, selectPlan: true, selectGame: true }
				// This would be called when the user opens the app
				navigation.navigate(ScreenEnum.SelectPlan);
			}
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error creating user: ", error.message)
		}
	};

	const userSignIn = async ({ email, password, googleId }: SignInProps) => {
		try {
			await signIn({ email: email, password: password, googleId: googleId })
				.then((userResponse) => {
					if (!!userResponse) {
						saveUserAndLogin(userResponse, true);
					}
				})
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error signing in: ", error.message)
		}
	}

	const linkAccount = ({ email, password, googleId }: SignInProps) => {
		Alert.alert(
			t('common:errors.accountExists'),
			t('common:errors.accountExistsMsg'),
			[
				{
					text: t('common:alerts.ok'),
					// Update user with googleId
					onPress: () => linkAndSignIn({
						email: email,
						password: password,
						googleId: googleId
					}).then((userResponse) => {
						console.log("User response: ", userResponse)
						if (!!userResponse) {
							saveUserAndLogin(userResponse, true);
						}
					})
				},
				{
					text: t('common:alerts.cancel')
				}
			]
		);
	};

	const checkUserAccount = async ({ email, password }: SignInProps) => {
		checkUserExists(email)
			.then((accounts) => {
				if (accounts.regular) {
					userSignIn({
						email: email,
						password: password
					});
				}
				else if (accounts.google && !accounts.regular) {
					linkAccount({ email: email, password: password });
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
									linkAccount({ email: email, googleId: idToken });
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
												saveUserAndLogin(response, true);
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
			// TODO: Causing error
			// await GoogleSignin.revokeAccess();
			updateUserData(user);
			removeUserData();
			await GoogleSignin.signOut();
			removeUserData();
		} catch (error) {
			console.log("Error signing out: ", error)
		}
	};

	return { 
		sendEmailVerification, 
		checkUserAccount, 
		userSignIn, 
		createUser, 
		googleUserSignIn, 
		signOut 
	}
};

export default useGetLoginMethods;