import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import LoginFormContent from '@components/custom/LoginForm/LoginFormContent.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

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