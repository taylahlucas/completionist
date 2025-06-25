import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsRequestLoading } from '@data/api/hooks/use-is-request-loading';
import useIsKeyboardVisible from '@utils/hooks/useIsKeyboardVisible.native';
import useLoginState from '@components/custom/LoginForm/provider/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useSendVerificationEmail from '@components/custom/LoginForm/hooks/useSendVerificationEmail';
import { isPwValid } from '@utils/hooks/index';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import { checkUserExists } from '@data/api/auth-endpoints';

const useLogin = () => {
  const { t } = useTranslation();
  const { isSigningUp, loginFormData } = useLoginState();
  const { setLoginFormData } = useLoginDispatch();
  const isRequestLoading = useIsRequestLoading();
  const isKeyboardVisible = useIsKeyboardVisible();
  const sendVerificationEmail = useSendVerificationEmail();
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  const onSubmit = () => {
    setSubmitPressed(true);
    if (isPwValid(loginFormData.pw ?? '')) {
      console.log('onSubmit checkUserExists: ', checkUserExists);
      checkUserExists(loginFormData.email).then(accounts => {
        if (accounts.regular || accounts.google) {
          sendVerificationEmail(
            loginFormData.email,
            t('common:auth.resetPw'),
            UnauthorizedScreenEnum.VerifyNewPassword,
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

export default useLogin;
