import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import useLoginState from '@components/custom/LoginForm/provider/useLoginState';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import { initialFormData } from '@components/custom/LoginForm/provider/LoginState';

const useVerifyNewPassword = () => {
  const navigation = useReactNavigation();
  const { t } = useTranslation();
  const { forgotPw } = useAuthEndpoints();
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

export default useVerifyNewPassword;
