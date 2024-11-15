import React from 'react';
import { useTranslation } from 'react-i18next';
import TextInput from '@components/general/TextInput/TextInput.native';
import { LoginFormContainer, LoginFormButtonContainer } from './LoginFormStyledComponents.native';
import Button from '@components/general/Button/Button.native';
import useLoginState from './provider/useLoginState';
import useLoginDispatch from './provider/useLoginDispatch';
import Condition from '@components/general/Condition.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';

const LoginForm = () => {
	const navigation = useReactNavigation();
  const { t } = useTranslation();
  const { setLoginFormData } = useLoginDispatch();
  const { loginFormData, isSigningUp } = useLoginState();
	
  return (
    <LoginFormContainer>
      <TextInput
				testID='email'
        placeholder={t('common:auth.email')}
        inputStyle='text'
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
					testID='password'
          placeholder={t('common:auth.userpw')}
          inputStyle='text'
          secureTextEntry
          value={loginFormData.pw ?? ''}
          onChangeText={(value) => setLoginFormData({
            ...loginFormData,
            pw: value
          })}
          onReset={(): void => setLoginFormData({
            ...loginFormData,
            pw: ''
          })}
        />
      </LoginFormButtonContainer>
      <Condition condition={isSigningUp}>
        <LoginFormButtonContainer>
          <TextInput
						testID='username'
            placeholder={t('common:auth.username')}
            inputStyle='text'
            value={loginFormData.username}
            onChangeText={(value) => setLoginFormData({
              ...loginFormData,
              username: value
            })}
            onReset={(): void => setLoginFormData({
              ...loginFormData,
              username: ''
            })}
          />
        </LoginFormButtonContainer>
      </Condition>
      <Condition condition={!isSigningUp}>
        <Button
					testID='forgot-password'
          title={t('common:auth.forgotPw')}
          type='text'
          style={{ alignItems: 'flex-end' }}
          onPress={() => navigation.navigate(UnauthorizedScreenEnum.ForgotPassword)}
        />
      </Condition>
    </LoginFormContainer>
  );
};

export default LoginForm;