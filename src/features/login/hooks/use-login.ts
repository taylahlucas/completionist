import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { isPwValid } from '@utils/helpers/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { checkUserExists } from '@data/index';
import { useIsRequestLoading } from '@data/api/hooks';
import { useSendVerificationEmail } from '../login-form/hooks';
import { useIsKeyboardVisible } from '@utils/hooks';
import { useAuthDispatch, useAuthState } from '@redux/auth';

export const useLogin = () => {
  const { t } = useTranslation();
  const { loginFormData } = useAuthState();
  const { setLoginFormData } = useAuthDispatch();
  const isRequestLoading = useIsRequestLoading();
  const isKeyboardVisible = useIsKeyboardVisible();
  const sendVerificationEmail = useSendVerificationEmail();
  const [isSigningUp, triggerIsSigningUp] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  const onSubmit = () => {
    setSubmitPressed(true);
    if (isPwValid(loginFormData.pw ?? '')) {
      checkUserExists(loginFormData.email).then(accounts => {
        if (accounts.regular || accounts.google) {
          sendVerificationEmail(
            loginFormData.email,
            t('common:auth.resetPw'),
            UnAuthorizedScreenEnum.VerifyNewPassword,
          );
        } else {
          Alert.alert(
            t('common:errors.emailNotFound'),
            t('common:errors.differentEmail'),
          );
        }
        setSubmitPressed(false);
      });
    }
  };

  return {
    viewModel: {
      loginFormData,
      login: {
        isLoading: isRequestLoading,
        isSigningUp,
        isKeyboardVisible,
      },
      forgotPw: {
        isInvalid: !isPwValid(loginFormData.pw ?? '') && submitPressed,
      },
    },
    actions: {
      login: {
        triggerIsSigningUp,
      },
      forgotPw: {
        setLoginFormData,
        onSubmit,
      },
    },
  };
};
