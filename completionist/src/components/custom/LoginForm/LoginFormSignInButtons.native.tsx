import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import useGetLoginMethods from './hooks/useGetLoginMethods';

const LoginFormSignInButtons = () => {
  const { signIn } = useGetLoginMethods();
  
  return (
    <>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </>
  );
};

export default LoginFormSignInButtons;