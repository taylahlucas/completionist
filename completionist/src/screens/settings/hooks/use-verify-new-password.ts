import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { forgotPw } from '@data/api/auth-endpoints';
import { useReactNavigation } from '@navigation/hooks';
import { UnauthorizedScreenEnum } from '@utils/custom-enums';
import {
  useLoginState,
  useLoginDispatch,
  initialFormData,
} from '@components/custom/login-form/provider';

export const useVerifyNewPassword = () => {
  const navigation = useReactNavigation();
  const { t } = useTranslation();
  // TODO: Replace this with local state?
  const { loginFormData, verificationToken } = useLoginState();
  const { setLoginFormData } = useLoginDispatch();

  const forgotPassword = () => {
    if (loginFormData.pw) {
      forgotPw({
        email: loginFormData.email,
        newPw: loginFormData.pw,
      }).then(() => {
        Alert.alert(t('common:auth.updatePwSuccess'), '', [
          {
            text: t('common:alerts.cta.ok'),
            onPress: () => {
              setLoginFormData(initialFormData);
              navigation.navigate(UnauthorizedScreenEnum.Login);
            },
          },
        ]);
      });
    }
  };

  return {
    viewModel: {
      verificationToken,
      loginFormData,
    },
    actions: {
      forgotPassword,
    },
  };
};
