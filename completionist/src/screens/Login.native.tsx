import React from 'react';
import { ScrollView, View } from 'react-native';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import LoginForm from '@components/custom/LoginForm/LoginForm.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import LoginFormSignInButtons from '@components/custom/LoginForm/LoginFormSignInButtons.native';
import StyledText from '@components/general/Text/StyledText.native';
import Button from '@components/general/Button/Button.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useCreateOrGetUser from '@components/custom/LoginForm/hooks/useCreateOrGetUser';

const Login = () => {
  const navigation = useReactNavigation();
  const theme = useGetTheme();

  useCreateOrGetUser();

  // TODO: Add to styled components
  return (
    <StandardLayout>
      <StyledText style={{ marginTop: 32 }} color={theme.lightestGrey}>Completionist.</StyledText>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ height: '100%', alignItems: 'center' }}>
          <LoginForm />
          <Button
            title={'Forgot Password?'}
            type={'text'}
            onPress={() => null}
          />
          <Button
            title={'Login'}
            style={{ marginTop: 32 }}
            // TODO: Login functionality
            onPress={() => null}
          />
          <LoginFormSignInButtons />
          <Button
            title={'Signup'}
            type={'text'}
            style={{ marginTop: 32 }}
            onPress={(): void => navigation.navigate(ScreenEnum.Signup)}
          />
        </View>
      </ScrollView>
    </StandardLayout>
  );
};

export default Login;