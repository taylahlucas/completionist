import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import useCreateOrGetUser from '@components/custom/LoginForm/hooks/useCreateOrGetUser';
import LoginFormContent from '@components/custom/LoginForm/LoginFormContent.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Login = () => {
  useCreateOrGetUser();
  // TODO: Change NavigationHeader to thicker title
  return (
    <StandardLayout>
      <NavigationHeader title={'Completionist.'} leftAction={'none'} />
      <LoginFormContent />
    </StandardLayout>
  );
};

export default Login;