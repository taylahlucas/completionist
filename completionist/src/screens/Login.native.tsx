import React from 'react';
import { ScrollView, View } from 'react-native';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import StyledText from '@components/general/Text/StyledText.native';
import useCreateOrGetUser from '@components/custom/LoginForm/hooks/useCreateOrGetUser';
import LoginFormContent from '@components/custom/LoginForm/LoginFormContent.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Login = () => {
  const theme = useGetTheme();

  useCreateOrGetUser();

  return (
    <StandardLayout>
      <NavigationHeader title={'Completionist.'} leftAction={'none'} />
      <LoginFormContent />
    </StandardLayout>
  );
};

export default Login;