import React, { useEffect } from 'react';
import i18n from 'src/i18n/i18n.native';
import { I18nextProvider } from 'react-i18next';
import { Condition } from '@components/general';
import { useMainDispatch, useMainState } from '@redux/hooks';
import { Landing } from './';
import { useTimedDataUpdate } from '@data/api/hooks';
import {
  AuthStackNavigator,
  UnAuthorizedStackNavigator,
} from '@navigation/index';
import { useAuthState } from '@redux/auth';

export const RootStackNavigator = () => {
  const { showSplashScreen } = useMainState();
  const { setShowSplashScreen } = useMainDispatch();
  // TODO: Generate isLoggedIn ?
  const { isLoggedIn } = useAuthState();
  useTimedDataUpdate();

  useEffect(() => {
    setShowSplashScreen(true);

    const timerId = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <Condition condition={!showSplashScreen} conditionalElement={<Landing />}>
      <I18nextProvider i18n={i18n}>
        {isLoggedIn ? <AuthStackNavigator /> : <UnAuthorizedStackNavigator />}
      </I18nextProvider>
    </Condition>
  );
};
