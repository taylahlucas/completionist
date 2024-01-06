import React, { useState } from 'react';
import TextInput from '@components/general/TextInput/TextInput.native';
import { LoginFormContainer } from './LoginFormStyledComponents.native';

interface LoginState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [user, setUser] = useState<LoginState>({
    email: '',
    password: ''
  });

  // TODO: Email/password login and signup
  return (
    <LoginFormContainer>
      <TextInput
        placeholder={'Email'}
        value={user.email}
        onChangeText={(value) => setUser({
          ...user,
          email: value
        })}
        onReset={(): void => setUser({
          ...user,
          email: ''
        })}
      />
      <TextInput 
        placeholder={'Password'}
        value={user.password}
        onChangeText={(value) => setUser({
          ...user,
          password: value
        })}
        onReset={(): void => setUser({
          ...user,
          password: ''
        })}
      />
    </LoginFormContainer>
  );
};

export default LoginForm;