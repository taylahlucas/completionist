import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { forgotPw } from '@data/index';
import { useReactNavigation } from '@navigation/hooks';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { useLoginState, useLoginDispatch } from '@features/login';
import { initialFormData } from '@redux/index';

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
              navigation.navigate(UnAuthorizedScreenEnum.Login);
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
