import { useEffect } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

interface GoogleSignInError {
  code: number;
  message: string;
}

const useGetLoginMethods = () => {
  const navigation = useReactNavigation();
  const { setLoggedIn } = useMainDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      console.log("HERE: ", idToken)
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      setLoggedIn(true);

      return auth().signInWithCredential(googleCredential)
        .then((response) => {
          console.log("RESPONSE: ", response);
          navigation.navigate(ScreenEnum.Quests)
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

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  return { signIn, signOut }
};

export default useGetLoginMethods;