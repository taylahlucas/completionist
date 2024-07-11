import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainState from '@redux/hooks/useMainState';
import { DrawerScreenEnum, UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useValidator from '@utils/hooks/useValidator';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import { LoginFormData } from '@utils/CustomInterfaces';
import { initialFormData } from '@components/custom/LoginForm/LoginState';

export interface ChangeAccountDetailsItem {
	value: string;
	changed: boolean;
}

interface ChangeAccountDetails {
	username: ChangeAccountDetailsItem;
	email: ChangeAccountDetailsItem;
	currentPw: ChangeAccountDetailsItem;
	newPw: ChangeAccountDetailsItem;
}

interface AccountDetailsViewModel {
	user: {
		username: string;
		email: string;
		pw: string | undefined;
	},
	userInfo: ChangeAccountDetails;
	verificationToken: string | undefined;
	loginFormData: LoginFormData;
	isNameValid: boolean;
	isEmailValid: boolean;
	isPwValid: boolean;
	showChangePw: boolean;
	submitDisabled: boolean;
}

interface AccountDetailsReturnType {
	viewModel: AccountDetailsViewModel,
	actions: {
		onSubmit: () => void;
		setUserInfo: (userInfo: ChangeAccountDetails) => void;
		forgotPassword: () => void;
	}
}

const useAccountDetails = (): AccountDetailsReturnType => {
	const navigation = useReactNavigation();
	const { t } = useTranslation();
	const { user, currentScreen } = useMainState();
	const { isEmailValid, isPwValid, isNameValid } = useValidator();
	const initialState = {
		username: { value: user.username, changed: false },
		email: { value: user.email, changed: false },
		currentPw: { value: '', changed: false },
		newPw: { value: '', changed: false },
	};
	const [userInfo, setUserInfo] = useState<ChangeAccountDetails>(initialState);
	const { saveUser } = useEditUserData();
	const { updateUser, changePw } = useEndpoints();
	const { checkUserExists, forgotPw } = useAuthEndpoints();
	const [showChangePw, setShowChangePw] = useState<boolean>(false);
	const [submitPressed, setSubmitPressed] = useState<boolean>(false);
	// TODO: Replace this with local state?
	const { loginFormData, verificationToken } = useLoginState();
	const { setLoginFormData } = useLoginDispatch();

	useEffect(() => {
		checkUserExists(user.email)
			.then((accounts) =>
				setShowChangePw(accounts.google && !accounts.regular ? false : true)
			);
	}, [])

	useEffect(() => {
		// Reset state
		if (currentScreen === DrawerScreenEnum.Settings) {
			resetState();
		}
	}, [currentScreen])

	const resetState = () => {
		setUserInfo(initialState);
		setSubmitPressed(false)
	};

	const successAlert = () => {
		Alert.alert(
			t('common:alerts.updateSuccess'),
			'',
			[
				{
					text: t('common:alerts.ok'),
					onPress: (): void => navigation.goBack()
				}
			]
		);
	};

	const onSubmit = (): void => {
		setSubmitPressed(true);
		// TODO: I don't think this would handle if I change multiple values at the same time?
		// TODO: Want to do verification check for changed email
		if (userInfo.email.changed && isEmailValid(userInfo.email.value)) {
			checkUserExists(userInfo.email.value)
				.then((accounts) => {
					if (!accounts.regular && !accounts.google) {
						let updatedUser = {
							...user,
							name: userInfo.username.changed ? userInfo.username.value : user.username,
							email: userInfo.email.value
						}
						updateUser(updatedUser).then(() => {
							saveUser(updatedUser);
							Alert.alert(t('common:alerts.updateSuccess'));
							setSubmitPressed(false);
							navigation.goBack();
						})
					}
					else if (accounts.regular && accounts.google) {
						Alert.alert(
							t('common:errors.emailAlreadyExists'),
							t('common:errors.differentEmail'),
						);
					}
					else if (!accounts.regular && accounts.google) {
						Alert.alert(
							t('common:errors.emailAlreadyExists'),
							t('common:errors.linkedWithGoogle')
						);
					}
					else if (!accounts.google && accounts.regular) {
						Alert.alert(
							t('common:errors.emailAlreadyExists'),
							t('common:errors.linkedWithRegular')
						);
					}
				})
		}
		else if (userInfo.username.changed && isNameValid(userInfo.username.value)) {
			updateUser({
				...user,
				username: userInfo.username.value
			})
				.then(() => {
					saveUser({
						...user,
						username: userInfo.username.value
					});
					successAlert();
				})
		}
		else if (userInfo.newPw.changed && isPwValid(userInfo.newPw.value)) {
			changePw({
				userId: user.userId,
				oldPw: userInfo.currentPw.value,
				newPw: userInfo.newPw.value
			})
				.then((response) => {
					if (response) {
						successAlert();
					}
				});
		}
	};

	const forgotPassword = () => {
		if (loginFormData.pw) {
			forgotPw({
				email: loginFormData.email,
				newPw: loginFormData.pw
			})
				.then(() => {
					Alert.alert(
						t('common:auth.updatePwSuccess'),
						'',
						[
							{
								text: t('common:alerts.ok'),
								onPress: () => {
									setLoginFormData(initialFormData);
									navigation.navigate(UnauthorizedScreenEnum.Login);
								}
							},
						]
					);
				})
		}
	};

	return {
		viewModel: {
			user: {
				username: user.username,
				email: user.email,
				pw: user.pw,
			},
			userInfo,
			// TODO: Replace with local state?
			verificationToken,
			loginFormData,

			isNameValid: !isNameValid(userInfo.username.value) && userInfo.username.changed && submitPressed,
			isEmailValid: !isEmailValid(userInfo.email.value) && userInfo.email.changed && submitPressed,
			isPwValid: !isPwValid(userInfo.newPw.value) && userInfo.newPw.changed && submitPressed,
			showChangePw,
			submitDisabled: !userInfo.username.changed
				&& !userInfo.email.changed
				&& !userInfo.newPw.changed
				&& (!isNameValid(userInfo.username.value)
					|| !isEmailValid(userInfo.email.value)
					|| !isPwValid(userInfo.newPw.value)
				)
		},
		actions: {
			onSubmit,
			setUserInfo,
			forgotPassword
		}
	}
};

export default useAccountDetails;