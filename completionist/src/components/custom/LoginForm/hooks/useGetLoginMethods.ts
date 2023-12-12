import { useEffect } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useMainState from '@redux/hooks/useMainState';

interface GoogleSignInError {
  code: number;
  message: string;
}

const useGetLoginMethods = () => {
  const navigation = useReactNavigation();
  const { setLoggedIn, setUserFormData } = useMainDispatch();
  const { userFormData } = useMainState();

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
      switch (error.code) {
        case (statusCodes.SIGN_IN_CANCELLED):
          console.log('Sign in cancelled: ', error.message);
          break;
        case (statusCodes.IN_PROGRESS):
          console.log("Sign in in progress");
          break;
        case (statusCodes.PLAY_SERVICES_NOT_AVAILABLE):
          console.log('Play services not available: ', error.message);
          break;
        default:
          console.log("Sign in error: ", error.message)
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate(ScreenEnum.Login);
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return { signIn, signOut }
};

export default useGetLoginMethods;