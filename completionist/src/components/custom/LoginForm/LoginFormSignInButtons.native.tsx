import React from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useGetLoginMethods from './hooks/useGetLoginMethods';
import Button from '@components/general/Button/Button.native';
import { LoginFormButtonContainer, LoginFormFooterContainer, LoginButton } from './LoginFormStyledComponents.native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useLoginDispatch from './hooks/useLoginDispatch';
import useLoginState from './hooks/useLoginState';
import StyledText from '@components/general/Text/StyledText.native';
import Condition from '@components/general/Condition.native';
import useValidator from '@utils/hooks/useValidator';
import useSendVerificationEmail from './hooks/useSendVerificationEmail';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';

const LoginFormSignInButtons = () => {
	const { t } = useTranslation();
	const { checkUserAccount, googleUserSignIn } = useGetLoginMethods();
	const { triggerIsSigningUp } = useLoginDispatch();
	const sendVerificationEmail = useSendVerificationEmail();
	const { loginFormData, isSigningUp } = useLoginState();
	const { checkUserExists } = useAuthEndpoints();
	const { isEmailValid, isPwValid, isNameValid } = useValidator();
	const isLoginDisabled = !isEmailValid(loginFormData.email) || !isPwValid(loginFormData.password ?? '') || 
	(isSigningUp 
		? !isNameValid(loginFormData.name) 
		: false
	);
	
	// TODO: get this to move with screen
	return (
		<View style={{ alignItems: 'center' }}>
			<LoginButton
				testID={'login-button'}
				title={isSigningUp 
					? t('common:auth.createAccount')
					: t('common:auth.login')
				}
				disabled={isLoginDisabled}
				onPress={() => isSigningUp 
					? checkUserExists(loginFormData.email)
							.then((response) => {
								if (!response.regular && !response.google) {
									sendVerificationEmail(loginFormData.email)
								}
								else {
									Alert.alert(
										'Email already exists',
										'You are unable to create a new account with this email. Please login.'
									);
								}
							})
					: checkUserAccount({ 
							email: loginFormData.email, 
							password: loginFormData.password
						})
				}
			/>
			<LoginFormButtonContainer>
				<GoogleSigninButton
					testID={'google-sign-in'}
					style={{ width: 200 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={googleUserSignIn}
				/>
			</LoginFormButtonContainer>
			<LoginFormFooterContainer>
				<Condition condition={!isSigningUp}>
					<StyledText testID={'request-account'}>{t('common:auth.requestAccount')}</StyledText>
				</Condition>
				<Button
					title={!isSigningUp ? t('common:auth.signUp') : t('common:auth.backToLogin')}
					type='text'
					onPress={(): void => triggerIsSigningUp(!isSigningUp)}
				/>
			</LoginFormFooterContainer>
		</View>
	);
};

export default LoginFormSignInButtons;