import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { isPwValid } from '@utils/helpers/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { checkUserExists } from '@data/index';
import { useIsRequestLoading } from '@data/api/hooks';
import { useLoginDispatch, useLoginState } from '../provider';
import { useSendVerificationEmail } from '../login-form/hooks';
import { useIsKeyboardVisible } from '@utils/hooks';
import { useGetNavigationPath } from '@navigation/hooks';
import { useMainState } from '@redux/hooks';

export const useLogin = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const { isLoggedIn, isSigningUp, loginFormData } = useLoginState();
  const { setLoggedIn, setLoginFormData } = useLoginDispatch();
  const isRequestLoading = useIsRequestLoading();
  const isKeyboardVisible = useIsKeyboardVisible();
  const sendVerificationEmail = useSendVerificationEmail();
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);
  const getAuthNavigationPath = useGetNavigationPath();

  useEffect(() => {
    if (isLoggedIn || isSigningUp) {
      console.log('setting-1: ', JSON.stringify(user));
      setLoggedIn(
        user.signup.verification &&
          user.signup.selectGame &&
          user.signup.setUsername,
      );
    }
    if (!isLoggedIn && user.userId) {
      getAuthNavigationPath(user);
    }
  }, [isLoggedIn, isSigningUp, user.signup]);

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
      forgotPw: {
        setLoginFormData,
        onSubmit,
      },
    },
  };
};
