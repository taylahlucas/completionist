import React from 'react';
import { View } from 'react-native';
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
import useSendEmailVerification from './hooks/useSendEmailVerification';

const LoginFormSignInButtons = () => {
	const { t } = useTranslation();
	const { checkUserAccount, googleUserSignIn } = useGetLoginMethods();
	const { triggerIsSigningUp } = useLoginDispatch();
	const sendEmailVerification = useSendEmailVerification();
	const { loginFormData, isSigningUp } = useLoginState();
	const { isEmailValid, isPasswordValid, isNameValid } = useValidator();
	const isLoginDisabled = !isEmailValid(loginFormData.email) || !isPasswordValid(loginFormData.password ?? '') || 
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
					? sendEmailVerification(loginFormData.email)
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