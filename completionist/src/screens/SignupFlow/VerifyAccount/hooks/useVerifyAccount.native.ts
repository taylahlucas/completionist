import useLoginDispatch from "@components/custom/LoginForm/hooks/useLoginDispatch";
import useLoginState from "@components/custom/LoginForm/hooks/useLoginState";
import useAuthEndpoints from "@data/api/hooks/useAuthEndpoints.native";
import useIsLoading from "@data/api/hooks/useIsLoading.native";
import useEditUserData from "@data/hooks/useEditUserData.native";
import useMainState from "@redux/hooks/useMainState";

export const useVerifyAccount = () => {
  const { user } = useMainState();
  const { loginFormData, verificationToken } = useLoginState();
  const { setVerificationToken, setLoggedIn } = useLoginDispatch();
  const isLoading = useIsLoading();
  const { saveUser } = useEditUserData();
  const { signUp, linkAndSignIn } = useAuthEndpoints();

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
      setLoggedIn
    }
  }
};