import { signUp, linkAndSignIn } from '@data/index';
import { useIsRequestLoading } from '@data/api/hooks';
import { useEditUserData } from '@data/hooks/index';
import { useAuthDispatch, useAuthState } from '@redux/auth';

export const useVerifyAccount = () => {
  const { user, loginFormData, verificationToken } = useAuthState();
  const { setVerificationToken } = useAuthDispatch();
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
    },
  };
};
