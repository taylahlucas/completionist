import React, { useEffect } from 'react';
import i18n from 'src/i18n/i18n.native';
import { I18nextProvider } from 'react-i18next';
import { Condition } from '@components/general';
import { useMainDispatch, useMainState } from '@redux/hooks';
import { useInitUserData } from '@data/hooks';
import { Landing } from './';
import { useTimedDataUpdate } from '@data/api/hooks';
import {
  AuthStackNavigator,
  UnauthorizedStackNavigator,
} from '@navigation/index';
import { useLoginState } from '@features/login';
import { View } from 'react-native';

export const RootStackNavigator = () => {
  const { showSplashScreen } = useMainState();
  const { setShowSplashScreen } = useMainDispatch();
  const { isAuthenticated } = useLoginState();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);
  useInitUserData();
  useTimedDataUpdate();

  return (
    // <View style={{ height: 100, width: 100, backgroundColor: 'red' }} />
    <Condition condition={!showSplashScreen} conditionalElement={<Landing />}>
      <I18nextProvider i18n={i18n}>
        {!isAuthenticated ? (
          <UnauthorizedStackNavigator />
        ) : (
          <AuthStackNavigator />
        )}
      </I18nextProvider>
    </Condition>
  );
};
