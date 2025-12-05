import React, { useEffect } from 'react';
import i18n from 'src/i18n/i18n.native';
import { I18nextProvider } from 'react-i18next';
import { useMainDispatch, useMainState } from '@redux/hooks';
import { useTimedDataUpdate } from '@api/';
import {
  AuthStackNavigator,
  UnAuthorizedStackNavigator,
} from '@navigation/index';
import { useAuthState } from '@redux/auth';

export const RootStackNavigator = () => {
  const { user } = useAuthState();
  const { showSplashScreen } = useMainState();
  const { setShowSplashScreen } = useMainDispatch();
  const isLoggedIn = user
    ? Object.values(user.signup).every(value => value === true)
    : false;

  useTimedDataUpdate(isLoggedIn, user);

  useEffect(() => {
    setShowSplashScreen(true);

    const timerId = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  return (
    // <Condition condition={!showSplashScreen} conditionalElement={<Landing />}>
    //   <I18nextProvider i18n={i18n}>
    //     {isLoggedIn ? <AuthStackNavigator /> : <UnAuthorizedStackNavigator />}
    //   </I18nextProvider>
    // </Condition>
    <I18nextProvider i18n={i18n}>
      {isLoggedIn ? (
        <AuthStackNavigator />
      ) : (
        <UnAuthorizedStackNavigator showSplashScreen={showSplashScreen} />
      )}
    </I18nextProvider>
  );
};
