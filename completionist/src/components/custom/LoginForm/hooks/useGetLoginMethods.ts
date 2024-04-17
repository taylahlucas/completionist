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
			const generateUniqueCode = 'ANC234';
			await sendEmail({
				// TODO: Swap for completionist email
				// TODO: Add to translations
				emailTo: email,
				subject: 'Verify your account',
				text: `Hello,\nYou have recently created an account with Completionist.\nTo verify your account, please enter the following code in the application: ${generateUniqueCode}`
			});
			setVerificationToken(generateUniqueCode);
			// navigation.navigate(ScreenEnum.)
		}
		catch (error: AxiosErrorResponse) {
			console.log("Error sending verification email ", error.message)
		}
	};

	const createUser = async (data: LoginFormData) => {
		try {
			const response = await signUp({ data: data });
			if (!!response) {
				saveUserAndLogin(response, true);
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
			"Account exists.",
			"Would you like to link these accounts?",
			[
				{
					text: "Ok",
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
					text: "Cancel"
				}
			]
		);
	};

	const checkUserAccount = async ({ email, password }: SignInProps) => {
		checkUserExists(email)
			.then((accounts) => {
				console.log("Accounts: ", accounts, " email: ", email)
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
					Alert.alert('Email Not Found', 'Please check your credentials and try again.');
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
						Alert.alert(t('common:errors.googleSignIn'), 'Problem getting info for this google account.');
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