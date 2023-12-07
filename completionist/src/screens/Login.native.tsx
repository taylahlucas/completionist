import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import StyledText from '@components/general/Text/StyledText.native';

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
    } catch (error: GoogleSignInError | any) {
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
      <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{ height: '100%' }}>
            <View style={{ backgroundColor: 'red', height: '100%', justifyContent: 'center' }}>
              <StyledText>Email</StyledText>
              <StyledText>Password</StyledText>
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
    </StandardLayout>
  );
};

export default Login;