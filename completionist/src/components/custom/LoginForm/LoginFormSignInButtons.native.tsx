import React from 'react';
import useGetLoginMethods from './hooks/useGetLoginMethods';
import Button from '@components/general/Button/Button.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { LoginFormButtonContainer } from './LoginFormStyledComponents.native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useLoginDispatch from './hooks/useLoginDispatch';
import useLoginState from './hooks/useLoginState';

const LoginFormSignInButtons = () => {
  const navigation = useReactNavigation();
  const { signIn } = useGetLoginMethods();
  const { triggerIsSigningUp } = useLoginDispatch();
  const { isSigningUp } = useLoginState();

  // TODO: Add to styled components && add facebok and apple signin
  return (
    <>
      <Button
        title={isSigningUp ? 'Create Account' : 'Login'}
        style={{ marginTop: 16, marginBottom: 32 }}
        // TODO: Login functionality
        onPress={() => null}
      />
      <LoginFormButtonContainer>
        <GoogleSigninButton
          style={{ width: 200 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      </LoginFormButtonContainer>
      <Button
        title={!isSigningUp ? "Don't have an account? Sign up" : "Back to Login"}
        type={'text'}
        style={{ marginTop: 32 }}
        onPress={(): void => triggerIsSigningUp(!isSigningUp)}
      />
    </>
  );
};

export default LoginFormSignInButtons;