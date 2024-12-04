import React from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useGetLoginMethods from './hooks/useGetLoginMethods';
import Button from '@components/general/Button/Button.native';
import { LoginFormButtonContainer, LoginFormFooterContainer, LoginButton } from './LoginFormStyledComponents.native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useLoginDispatch from './provider/useLoginDispatch';
import useLoginState from './provider/useLoginState';
import StyledText from '@components/general/Text/StyledText.native';
import {Condition} from '@components/general/index';
import useValidator from '@utils/hooks/useValidator';
import useSendVerificationEmail from './hooks/useSendVerificationEmail';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';

const LoginFormSignInButtons = () => {
	const { t } = useTranslation();
	const { checkUserAccount, googleUserSignIn } = useGetLoginMethods();
	const { triggerIsSigningUp } = useLoginDispatch();
	const sendVerification = useSendVerificationEmail();
	const { loginFormData, isSigningUp } = useLoginState();
	const { checkUserExists } = useAuthEndpoints();
	const { isEmailValid, isPwValid, isNameValid } = useValidator();
	const isLoginDisabled = !isEmailValid(loginFormData.email) || !isPwValid(loginFormData.pw ?? '') || 
	(isSigningUp 
		? !isNameValid(loginFormData.username) 
		: false
	);
	
	// TODO: get this to move with screen, add to translations
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
									sendVerification(
										loginFormData.email,
										'common:sendRequest.verifyAccount',
										UnauthorizedScreenEnum.VerifyAccount
									);
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
							pw: loginFormData.pw ?? ''
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