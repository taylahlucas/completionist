import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyledText,
  TextInput,
  Button,
  ErrorMessage,
  KeyboardAvoidingScrollView,
  Condition,
  ParagraphView,
} from '@components/general';
import { useLogin } from '@features/login/hooks';

export const ForgotPasswordContent = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useLogin();

  const renderAwareView = () => (
    <Button
      testID="forgot-password"
      type="footer"
      title={t('common:continue')}
      disabled={!viewModel.loginFormData.email || !viewModel.loginFormData.pw}
      onPress={actions.forgotPw.onSubmit}
    />
  );

  return (
    <>
      <ParagraphView>
        <StyledText>{t('common:auth.forgotPwDesc')}</StyledText>
      </ParagraphView>
      <KeyboardAvoidingScrollView awareView={renderAwareView()}>
        <TextInput
          testID="email"
          placeholder={t('common:auth.email')}
          inputStyle="text"
          value={viewModel.loginFormData.email}
          onChangeText={value =>
            actions.forgotPw.setLoginFormData({
              ...viewModel.loginFormData,
              email: value,
            })
          }
          onReset={(): void =>
            actions.forgotPw.setLoginFormData({
              ...viewModel.loginFormData,
              email: '',
            })
          }
        />
        <TextInput
          testID="new-password"
          placeholder={t('common:accountDetails.newPw')}
          inputStyle="text"
          secureTextEntry
          value={viewModel.loginFormData.pw}
          onChangeText={value =>
            actions.forgotPw.setLoginFormData({
              ...viewModel.loginFormData,
              pw: value,
            })
          }
          onReset={(): void =>
            actions.forgotPw.setLoginFormData({
              ...viewModel.loginFormData,
              pw: '',
            })
          }
        />
        <Condition condition={viewModel.forgotPw.isInvalid}>
          <ErrorMessage>
            {`${t('common:login.instructions1')}${t(
              'common:login.instructions2',
            )}`}
          </ErrorMessage>
        </Condition>
      </KeyboardAvoidingScrollView>
    </>
  );
};
