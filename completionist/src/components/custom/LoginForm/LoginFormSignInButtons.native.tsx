import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useMainState from '@redux/hooks/useMainState';
import React from 'react';
import { Button, Text, View } from 'react-native';
import useGetLoginMethods from './hooks/useGetLoginMethods.native';

const LoginFormSignInButtons = () => {
  const { signIn, signOut } = useGetLoginMethods();
  const { loggedIn } = useMainState();
  
  return (
    <>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      {/* <View>
        {!loggedIn && <Text>You are currently logged out</Text>}
        {loggedIn && (
          <Button
            onPress={signOut}
            title="LogOut"
            color="red"></Button>
        )}
      </View> */}
    </>
  );
};

export default LoginFormSignInButtons;