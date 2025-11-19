import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginFormContainer, LoginFormContentContainer } from './';
import { Condition, TextInput, Button } from '@components/general';
import { UnAuthorizedScreenEnum } from '@utils/custom-enums';
import { useReactNavigation } from '@navigation/hooks';
import { useAuthDispatch, useAuthState } from '@redux/auth';

export const LoginForm = ({ isSigningUp }: { isSigningUp: boolean }) => {
  const navigation = useReactNavigation();
  const { t } = useTranslation();
  const { loginFormData } = useAuthState();
  const { setLoginFormData } = useAuthDispatch();

  return (
    <LoginFormContainer>
      <TextInput
        testID="email"
        placeholder={t('common:auth.email')}
        inputStyle="text"
        value={loginFormData.email}
        onChangeText={value =>
          setLoginFormData({
            ...loginFormData,
            email: value,
          })
        }
        onReset={(): void =>
          setLoginFormData({
            ...loginFormData,
            email: '',
          })
        }
      />
      <LoginFormContentContainer>
        <TextInput
          testID="password"
          placeholder={t('common:auth.userpw')}
          inputStyle="text"
          secureTextEntry
          value={loginFormData.pw ?? ''}
          onChangeText={value =>
            setLoginFormData({
              ...loginFormData,
              pw: value,
            })
          }
          onReset={(): void =>
            setLoginFormData({
              ...loginFormData,
              pw: '',
            })
          }
        />
      </LoginFormContentContainer>
      <Condition condition={isSigningUp}>
        <LoginFormContentContainer>
          <TextInput
            testID="username"
            placeholder={t('common:auth.username')}
            inputStyle="text"
            value={loginFormData.username}
            onChangeText={value =>
              setLoginFormData({
                ...loginFormData,
                username: value,
              })
            }
            onReset={(): void =>
              setLoginFormData({
                ...loginFormData,
                username: '',
              })
            }
          />
        </LoginFormContentContainer>
      </Condition>
      <Condition condition={!isSigningUp}>
        <Button
          testID="forgot-password"
          title={t('common:auth.forgotPw')}
          type="text"
          style={{ alignItems: 'flex-end' }}
          onPress={() =>
            navigation.navigate(UnAuthorizedScreenEnum.ForgotPassword)
          }
        />
      </Condition>
    </LoginFormContainer>
  );
};
