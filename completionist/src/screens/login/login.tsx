import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '../../components/general/layouts/standard-layout';
import { NavigationHeader } from '@navigation/index';
import { Condition } from '@components/general/index';
import StyledText from '@components/general/text/styled-text';
import {
  LoginForm,
  LoginContentContainer,
  LoginFormSignInButtons,
} from '@components/custom';
import { UnauthorizedScreenEnum } from '@utils/custom-enums';
import { useLogin } from './hooks';

export const Login = () => {
  const { t } = useTranslation();
  const { viewModel } = useLogin();

  return (
    <StandardLayout isLoading={viewModel.login.isLoading}>
      <NavigationHeader
        id={UnauthorizedScreenEnum.Login}
        title={t('common:appTitle')}
        leftAction={'none'}
      />
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
          <LoginForm />
        </LoginContentContainer>
        <LoginFormSignInButtons />
      </ScrollView>
    </StandardLayout>
  );
};
