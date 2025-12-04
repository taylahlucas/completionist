import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  LoginFormContentContainer,
  LoginFormFooterContainer,
  LoginButton,
} from './';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Condition, Button, StyledText } from '@components/general';
import { isEmailValid, isPwValid, isNameValid } from '@utils/helpers/index';
import { useSendVerificationEmail, useGetLoginMethods } from './hooks';
import { useAuthState } from '@redux/auth';
import { UnAuthorizedScreenEnum } from '@utils/custom-enums';
import { useCheckUserExists } from 'src/hooks/auth/use-check-user-exists';

export const LoginFormSignInButtons = ({
  isSigningUp,
  triggerIsSigningUp,
}: {
  isSigningUp: boolean;
  triggerIsSigningUp: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { checkUserAccount, googleUserSignIn } =
    useGetLoginMethods(triggerIsSigningUp);
  const sendVerification = useSendVerificationEmail();
  const { loginFormData } = useAuthState();
  const isLoginDisabled =
    !isEmailValid(loginFormData.email) ||
    !isPwValid(loginFormData.pw ?? '') ||
    (isSigningUp ? !isNameValid(loginFormData.username) : false);

  const { refetch: fetchUser } = useCheckUserExists(loginFormData.email, false);

  const handleLoginPress = useCallback(() => {
    void fetchUser().then(result => {
      const user = result.data;

      if (isSigningUp) {
        if (user && !user.regular && !user.google) {
          sendVerification(
            loginFormData.email,
            'common:sendRequest.verifyAccount',
            UnAuthorizedScreenEnum.VerifyAccount,
          );
        } else {
          Alert.alert(
            t('common:errors.emailAlreadyExists'),
            t('common:errors.retryLogin'),
          );
        }
      } else {
        checkUserAccount({
          account: user,
          ...loginFormData,
        });
      }
    });
  }, [
    isSigningUp,
    fetchUser,
    loginFormData,
    sendVerification,
    checkUserAccount,
    t,
  ]);

  // TODO: get this to move with screen
  return (
    <View style={{ alignItems: 'center' }}>
      <LoginButton
        testID="login-button"
        title={
          isSigningUp ? t('common:auth.createAccount') : t('common:auth.login')
        }
        disabled={isLoginDisabled}
        onPress={handleLoginPress}
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
