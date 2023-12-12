import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useGetLoginMethods from './hooks/useGetLoginMethods';

const LoginFormSignInButtons = () => {
  const { signIn } = useGetLoginMethods();
  
  // TODO: Add to styled components && add facebok and apple signin
  return (
    <>
      <GoogleSigninButton
        style={{ width: 192, height: 48, marginTop: 16 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </>
  );
};

export default LoginFormSignInButtons;