import React from 'react';
import Button from '@components/general/Button/Button.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { LandingFormContainer, LandingFormButton } from './LandingFormStyledComponents.native';

interface LoginState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigation = useReactNavigation();

  return (
    <LandingFormContainer>
      <Button title={'Login'} onPress={(): void => navigation.navigate(ScreenEnum.Login)} />
      <LandingFormButton title={'Signup'} onPress={(): void => navigation.navigate(ScreenEnum.Login)} />
    </LandingFormContainer>
  );
};

export default LoginForm;