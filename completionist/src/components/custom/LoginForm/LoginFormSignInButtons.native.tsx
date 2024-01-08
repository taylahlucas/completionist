import React from 'react';
import useGetLoginMethods from './hooks/useGetLoginMethods';
import Button from '@components/general/Button/Button.native';
import { LoginFormButtonContainer, LoginFormFooterContainer } from './LoginFormStyledComponents.native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useLoginDispatch from './hooks/useLoginDispatch';
import useLoginState from './hooks/useLoginState';
import StyledText from '@components/general/Text/StyledText.native';
import Condition from '@components/general/Condition.native';

const LoginFormSignInButtons = () => {
  const { signUp, userSignIn, googleSignIn } = useGetLoginMethods();
  const { triggerIsSigningUp } = useLoginDispatch();
  const { loginFormData, isSigningUp } = useLoginState();

  // TODO: Add to styled components
  return (
    <>
      <Button
        title={isSigningUp ? "Create Account" : "Login"}
        style={{ marginTop: 16, marginBottom: 32 }}
        disabled={!loginFormData.email || !loginFormData.password}
        onPress={() => isSigningUp ? signUp() : userSignIn()}
      />
      <LoginFormButtonContainer>
        <GoogleSigninButton
          style={{ width: 200 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
        />
      </LoginFormButtonContainer>
      <LoginFormFooterContainer>
        <Condition condition={!isSigningUp}>
          <StyledText type={'ListItemSubTitle'}>Don't have an account?</StyledText>
        </Condition>
          <Button
            title={!isSigningUp ? "Sign up" : "Back to Login"}
            type={'text'}
            onPress={(): void => triggerIsSigningUp(!isSigningUp)}
          />
      </LoginFormFooterContainer>
    </>
  );
};

export default LoginFormSignInButtons;