import React from 'react';
import { ScrollView, View } from 'react-native';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import LoginForm from '@components/custom/LoginForm/LoginForm.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import LoginFormSignInButtons from '@components/custom/LoginForm/LoginFormSignInButtons.native';


const Login = () => {
  const theme = useGetTheme();

  return (
    <StandardLayout>
      <StyledText color={theme.lightestGrey}>Completionist.</StyledText>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{ height: '100%' }}>
            <LoginForm />
            <LoginFormSignInButtons />
          </View>
        </ScrollView>
    </StandardLayout>
  );
};

export default Login;