import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '../../components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/navigation-header';
import { LoginContentContainer } from '@components/custom/LoginForm/LoginFormStyledComponents.native';
import { Condition } from '@components/general/index';
import StyledText from '@components/general/Text/StyledText.native';
import LoginForm from '@components/custom/LoginForm/LoginForm.native';
import LoginFormSignInButtons from '@components/custom/LoginForm/LoginFormSignInButtons.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useLogin from './hooks/useLogin';

const Login = () => {
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

export default Login;
