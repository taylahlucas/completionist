import React from 'react';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import LoginFormContent from '@components/custom/LoginForm/LoginFormContent.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  
  return (
    <StandardLayout>
      <NavigationHeader title={t('common:appTitle')} leftAction={'none'} />
      <LoginFormContent />
    </StandardLayout>
  );
};

export default Login;