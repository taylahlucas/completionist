import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Condition } from '@components/general';
import { useMainState } from '@redux/hooks';
import { useInitUserData } from '@data/hooks';
import { Landing } from './';
import { usePlaySplashScreen } from '@utils/hooks';
import i18n from 'src/i18n/i18n.native';
import { useTimedDataUpdate } from '@data/api/hooks';
import {
  AuthStackNavigator,
  UnauthorizedStackNavigator,
} from '@navigation/index';
import { useLoginState } from '@components/custom/login-form/provider';

export const RootStackNavigator = () => {
  const { showSplashScreen } = useMainState();
  const { isAuthenticated } = useLoginState();

  usePlaySplashScreen();
  useInitUserData();
  useTimedDataUpdate();

  return (
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
