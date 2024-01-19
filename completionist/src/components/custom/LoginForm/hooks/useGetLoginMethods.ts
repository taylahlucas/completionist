import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useSaveUserData from '@data/hooks/useSaveUserData.native';
import useEndpoints from '@data/hooks/useEndpoints';
import { AxiosErrorResponse } from '@utils/CustomTypes';
import useLoginDispatch from './useLoginDispatch';
import useLoginState from './useLoginState';
import useKeychain from '@data/hooks/useKeychain.native';

interface GoogleSignInError {
  code: number;
  message: string;
}

interface GetLoginMethodsReturnType {
  userSignIn: () => Promise<void>
  createUser: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  googleSignOut: () => Promise<void>;
}

const useGetLoginMethods = (): GetLoginMethodsReturnType => {
  const { setLoginFormData } = useLoginDispatch();
  const { loginFormData } = useLoginState();
  const { storeCredentials } = useKeychain();
  const { saveUserData, removeUserData } = useSaveUserData();
  const { signIn, signUp } = useEndpoints();

  const userSignIn = async () => {
    try {
      const response = await signIn({ email: loginFormData.email, password: loginFormData.password ?? '' });
      if (!!response) {
        saveUserData(response);
      }
    }
    catch (error: AxiosErrorResponse) {
      console.log("Error signing in: ", error.message)
    }
  }

  const createUser = async () => {
    try {
      const response = await signUp({ data: loginFormData });
      if (!!response) {
        storeCredentials({
          username: response.name,
          password: response.userId ?? loginFormData.password ?? ''
        });
        saveUserData(response);
      }
    }
    catch (error: AxiosErrorResponse) {
      console.log("Error creating user: ", error.message)
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } =  await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      return auth()
        .signInWithCredential(googleCredential)
        .then((response) => {
          if (!!response?.user?.displayName && !!response.user?.email) {
            setLoginFormData({
              userId: response?.user?.uid,
              name: response?.user?.displayName,
              email: response?.user?.email,
              userAvatar: response?.user.photoURL ?? undefined
            });
          }
        });
    } catch (error: GoogleSignInError | any) {
      console.log("Error with google sign in: ", error.message);
    }
  }

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      removeUserData();
    } catch (error) {
      console.error("Error signing out: ", error);
      removeUserData();
    }
  };

  return { userSignIn, createUser, googleSignIn, googleSignOut }
};

export default useGetLoginMethods;