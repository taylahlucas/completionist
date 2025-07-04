import {
  useLoginDispatch,
  useLoginState,
} from '@components/custom/login-form/provider';
import { signUp, linkAndSignIn } from '@data/index';
import { useIsRequestLoading } from '@data/api/hooks';
import { useEditUserData } from '@data/hooks/index';
import { useMainState } from '@redux/hooks';

export const useVerifyAccount = () => {
  const { user } = useMainState();
  const { loginFormData, verificationToken } = useLoginState();
  const { setVerificationToken, setLoggedIn } = useLoginDispatch();
  const isRequestLoading = useIsRequestLoading();
  const { saveUser } = useEditUserData();

  return {
    viewModel: {
      user,
      loginFormData,
      isLoading: isRequestLoading,
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
