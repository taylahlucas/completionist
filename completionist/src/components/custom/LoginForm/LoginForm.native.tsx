import React from 'react';
import TextInput from '@components/general/TextInput/TextInput.native';
import { LoginFormContainer, LoginFormButtonContainer } from './LoginFormStyledComponents.native';
import Button from '@components/general/Button/Button.native';
import useLoginState from './hooks/useLoginState';
import useLoginDispatch from './hooks/useLoginDispatch';
import Condition from '@components/general/Condition.native';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const { setLoginFormData } = useLoginDispatch();
  const { loginFormData, isSigningUp } = useLoginState();
  
  return (
    <LoginFormContainer>
      <TextInput
				testID={'email'}
        placeholder={t('common:auth.email')}
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
					testID={'password'}
          placeholder={t('common:auth.password')}
          inputStyle={'text'}
          secureTextEntry
          value={loginFormData.password ?? ''}
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
						testID={'username'}
            placeholder={t('common:auth.username')}
            inputStyle={'text'}
            value={loginFormData.name}
            onChangeText={(value) => setLoginFormData({
              ...loginFormData,
              name: value
            })}
            onReset={(): void => setLoginFormData({
              ...loginFormData,
              name: ''
            })}
          />
        </LoginFormButtonContainer>
      </Condition>
      <Condition condition={!isSigningUp}>
        <Button
					testID={'forgot-password'}
          title={t('common:auth.forgotPassword')}
          type='text'
          style={{ alignItems: 'flex-end' }}
          onPress={() => {}}
        />
      </Condition>
    </LoginFormContainer>
  );
};

export default LoginForm;