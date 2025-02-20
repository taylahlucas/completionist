import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useLoginState from '@components/custom/LoginForm/provider/useLoginState';
import { signUp, linkAndSignIn } from '@data/api/authEndpoints';
import useIsLoading from '@data/api/hooks/useIsLoading.native';
import { useEditUserData } from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';

export const useVerifyAccount = () => {
  const { user } = useMainState();
  const { loginFormData, verificationToken } = useLoginState();
  const { setVerificationToken, setLoggedIn } = useLoginDispatch();
  const isLoading = useIsLoading();
  const { saveUser } = useEditUserData();

  return {
    viewModel: {
      user,
      loginFormData,
      isLoading,
      verificationToken,
    },
    actions: {
      signUp,
      linkAndSignIn,
      saveUser,
      setVerificationToken,
      setLoggedIn,
    },
  };
};
