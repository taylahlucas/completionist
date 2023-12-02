import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import QuestList from '../components/custom/QuestList/QuestList.native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface GoogleSignInError {
  code: number;
  message: string;
}

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      console.log("ID: ", idToken)

      setLoggedIn(true);
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Cancel: ', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress: ', error.message);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE: ', error.message);
        // play services not available or outdated
      } else {
        // some other error happened
        console.log("ERROR: ", error.message)
      }
    }
  }

  // const signIn = async () => {
  //   try {
  //     console.log("HERE: ", GoogleSignin)
  //     const userInfo = await GoogleSignin.configure({
  //       webClientId: config.webClientId
  //     });
  //     // setUser({ user });
  //   } catch (error: GoogleSignInError | any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       console.log('user cancelled the login flow')
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //       console.log('operation (e.g. sign in) is in progress already')
  //     } 
  //     // else if (error.code === statusCodes.ONE_TAP_START_FAILED) {
  //     //   // starting the one tap dialog failed
  //     //   console.log('starting the one tap dialog failed: ', error.message)
  //     // } else if (error.code === statusCodes.NO_SAVED_CREDENTIAL_FOUND) {
  //     //   console.log('No saved credentials found.')
  //     //   // No saved credentials found. Launch the One Tap sign-up flow (use GoogleOneTapSignIn.signUp)
  //     //   // or do nothing and continue presenting the signed-out UI.
  //     // } 
  //     else {
  //       // some other error happened
  //       console.log('some other error happened')
  //     }
  //   }
  // };
  
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await GoogleSignin.signOut(user.id);
      setLoggedIn(false);
      setUser([]);
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

  return (
    <StandardLayout>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
            <View>
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              />
            </View>
            <View>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={signOut}
                  title="LogOut"
                  color="red"></Button>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </StandardLayout>
  );
};

export default Login;