import React from 'react';
import { useTranslation } from 'react-i18next';
import useGetLoginMethods from './hooks/useGetLoginMethods';
import Button from '@components/general/Button/Button.native';
import { LoginFormButtonContainer, LoginFormFooterContainer, LoginButton } from './LoginFormStyledComponents.native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useLoginDispatch from './hooks/useLoginDispatch';
import useLoginState from './hooks/useLoginState';
import StyledText from '@components/general/Text/StyledText.native';
import Condition from '@components/general/Condition.native';

const LoginFormSignInButtons = () => {
	const { t } = useTranslation();
	const { createUser, userSignIn, googleSignIn } = useGetLoginMethods();
	const { triggerIsSigningUp } = useLoginDispatch();
	const { loginFormData, isSigningUp } = useLoginState();

	return (
		<>
			<LoginButton
				testID={'login-button'}
				title={isSigningUp ? t('common:auth.createAccount') : t('common:auth.login')}
				disabled={!loginFormData.email || !loginFormData.password}
				onPress={() => isSigningUp ? createUser() : userSignIn()}
			/>
			<LoginFormButtonContainer>
				<GoogleSigninButton
					testID={'google-sign-in'}
					style={{ width: 200 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={googleSignIn}
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
		</>
	);
};

export default LoginFormSignInButtons;