import React from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  LoginFormContentContainer,
  LoginFormFooterContainer,
  LoginButton,
} from './';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useLoginState, useLoginDispatch } from '../provider';
import { Condition, Button, StyledText } from '@components/general';
import { isEmailValid, isPwValid, isNameValid } from '@utils/helpers/index';
import { useSendVerificationEmail, useGetLoginMethods } from './hooks';
import { checkUserExists } from '@data/index';
import { UnauthorizedScreenEnum } from '@utils/index';

export const LoginFormSignInButtons = () => {
  const { t } = useTranslation();
  const { checkUserAccount, googleUserSignIn } = useGetLoginMethods();
  const { triggerIsSigningUp } = useLoginDispatch();
  const sendVerification = useSendVerificationEmail();
  const { loginFormData, isSigningUp } = useLoginState();
  const isLoginDisabled =
    !isEmailValid(loginFormData.email) ||
    !isPwValid(loginFormData.pw ?? '') ||
    (isSigningUp ? !isNameValid(loginFormData.username) : false);

  // TODO: get this to move with screen
  return (
    <View style={{ alignItems: 'center' }}>
      <LoginButton
        testID="login-button"
        title={
          isSigningUp ? t('common:auth.createAccount') : t('common:auth.login')
        }
        disabled={isLoginDisabled}
        onPress={() =>
          isSigningUp
            ? checkUserExists(loginFormData.email).then(response => {
                if (!response.regular && !response.google) {
                  sendVerification(
                    loginFormData.email,
                    'common:sendRequest.verifyAccount',
                    UnauthorizedScreenEnum.VerifyAccount,
                  );
                } else {
                  Alert.alert(
                    t('common:errors.emailAlreadyExists'),
                    t('common:errors.retryLogin'),
                  );
                }
              })
            : checkUserAccount({
                email: loginFormData.email,
                pw: loginFormData.pw ?? '',
              })
        }
      />
      <LoginFormContentContainer>
        <GoogleSigninButton
          testID={'google-sign-in'}
          style={{ width: 200 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleUserSignIn}
        />
      </LoginFormContentContainer>
      <LoginFormFooterContainer>
        <Condition condition={!isSigningUp}>
          <StyledText testID="request-account">
            {t('common:auth.requestAccount')}
          </StyledText>
        </Condition>
        <Button
          title={
            isSigningUp ? t('common:auth.backToLogin') : t('common:auth.signUp')
          }
          type="text"
          onPress={(): void => triggerIsSigningUp(!isSigningUp)}
        />
      </LoginFormFooterContainer>
    </View>
  );
};
