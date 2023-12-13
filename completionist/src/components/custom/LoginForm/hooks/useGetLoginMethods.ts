import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useSaveUserData from '@data/hooks/useSaveUserData.native';

interface GoogleSignInError {
  code: number;
  message: string;
}

const useGetLoginMethods = () => {
  const { setUserFormData } = useMainDispatch();
  const { userFormData } = useMainState();
  const { removeUserData } = useSaveUserData();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth()
        .signInWithCredential(googleCredential)
        .then((response) => {
          if (!!response?.user?.displayName && !!response.user?.email) {
            setUserFormData({
              userId: response?.user?.uid,
              name: response?.user?.displayName,
              email: response?.user?.email,
              userAvatar: response?.user.photoURL ?? undefined,
              subscription: userFormData.subscription
            });
          }
        });
    } catch (error: GoogleSignInError | any) {
      console.log("Sign in error: ", error.message);
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      removeUserData();
    } catch (error) {
      console.error(error);
    }
  };

  return { signIn, signOut }
};

export default useGetLoginMethods;