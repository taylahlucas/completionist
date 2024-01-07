import React from 'react';
import TextInput from '@components/general/TextInput/TextInput.native';
import { LoginFormContainer, LoginFormButtonContainer } from './LoginFormStyledComponents.native';
import Button from '@components/general/Button/Button.native';
import useLoginState from './hooks/useLoginState';
import useLoginDispatch from './hooks/useLoginDispatch';
import Condition from '@components/general/Condition.native';

const LoginForm = () => {
  const { setLoginFormData } = useLoginDispatch();
  const { loginFormData, isSigningUp } = useLoginState();
  
  // TODO: Email/password login and signup
  return (
    <LoginFormContainer>
      <TextInput
        placeholder={'Email'}
        inputStyle={'text'}
        value={loginFormData.email}
        onChangeText={(value) => setLoginFormData({
          ...loginFormData,
          email: value
        })}
        onReset={(): void => setLoginFormData({
          ...loginFormData,
          email: ''
        })}
      />
      <LoginFormButtonContainer>
        <TextInput
          placeholder={'Password'}
          inputStyle={'text'}
          value={loginFormData.password}
          onChangeText={(value) => setLoginFormData({
            ...loginFormData,
            password: value
          })}
          onReset={(): void => setLoginFormData({
            ...loginFormData,
            password: ''
          })}
        />
      </LoginFormButtonContainer>
      <Condition condition={isSigningUp}>
        <LoginFormButtonContainer>
          <TextInput
            placeholder={'Username'}
            inputStyle={'text'}
            value={loginFormData.password}
            onChangeText={(value) => setLoginFormData({
              ...loginFormData,
              password: value
            })}
            onReset={(): void => setLoginFormData({
              ...loginFormData,
              password: ''
            })}
          />
        </LoginFormButtonContainer>
      </Condition>
      <Condition condition={!isSigningUp}>
        <Button
          title={'Forgot Password?'}
          type={'text'}
          style={{ alignItems: 'flex-end' }}
          onPress={() => null}
        />
      </Condition>
    </LoginFormContainer>
  );
};

export default LoginForm;