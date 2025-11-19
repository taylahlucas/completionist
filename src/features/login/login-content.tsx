import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Condition, StyledText } from '@components/general';
import { useLogin } from './hooks';
import {
  LoginContentContainer,
  LoginForm,
  LoginFormSignInButtons,
} from './login-form';

export const LoginContent = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useLogin();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: viewModel.login.isKeyboardVisible ? 260 : 0,
      }}>
      <LoginContentContainer>
        <Condition condition={viewModel.login.isSigningUp}>
          <StyledText style={{ position: 'absolute' }}>
            {t('common:login.instructions1')}
          </StyledText>
          <StyledText align="left" style={{ position: 'absolute' }}>
            {t('common:login.instructions2')}
          </StyledText>
        </Condition>
        <LoginForm isSigningUp={viewModel.login.isSigningUp} />
      </LoginContentContainer>
      <LoginFormSignInButtons
        isSigningUp={viewModel.login.isSigningUp}
        triggerIsSigningUp={actions.login.triggerIsSigningUp}
      />
    </ScrollView>
  );
};
