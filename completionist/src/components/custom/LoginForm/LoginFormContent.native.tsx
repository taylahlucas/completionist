import React from 'react';
import { ScrollView } from 'react-native';
import LoginForm from './LoginForm.native';
import LoginFormSignInButtons from './LoginFormSignInButtons.native';
import { LoginContentContainer } from './LoginFormStyledComponents.native';

const LoginFormContent = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <LoginContentContainer>
        <LoginForm />
        <LoginFormSignInButtons />
      </LoginContentContainer>
    </ScrollView>
  )
};

export default LoginFormContent;