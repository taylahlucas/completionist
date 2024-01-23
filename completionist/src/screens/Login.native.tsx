import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import LoginFormContent from '@components/custom/LoginForm/LoginFormContent.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Login = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Completionist.'} leftAction={'none'} />
      <LoginFormContent />
    </StandardLayout>
  );
};

export default Login;