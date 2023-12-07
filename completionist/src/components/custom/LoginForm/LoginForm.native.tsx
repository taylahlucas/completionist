import React, { useState } from 'react';
import CustomTextInput from '@components/general/TextInput/CustomTextInput.native';
import { LoginFormContainer, LoginTextInputContainer } from './LoginFormStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface LoginState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const theme = useGetTheme();
  
  const [user, setUser] = useState<LoginState>({
    email: '',
    password: ''
  });

  return (
    <LoginFormContainer>
      <LoginTextInputContainer color={theme.darkGrey}>
        <CustomTextInput 
          placeholder={'Email'}
          value={user.email}
          onChange={(value) => setUser({
            ...user,
            email: value
          })}
          onReset={(): void => setUser({
            ...user,
            email: ''
          })}
        />
      </LoginTextInputContainer>
      <LoginTextInputContainer color={theme.darkGrey}>
        <CustomTextInput 
          placeholder={'Password'}
          value={user.password}
          onChange={(value) => setUser({
            ...user,
            password: value
          })}
          onReset={(): void => setUser({
            ...user,
            password: ''
          })}
        />
      </LoginTextInputContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;