import React from 'react';
import { I18nextProvider } from 'react-i18next';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import useInitUserData from '@data/hooks/useInitUserData.native';
import Landing from './Landing.native';
import usePlaySplashScreen from '@utils/hooks/usePlaySplashScreen.native';
import i18n from 'src/i18n/i18n.native';
import useTimedDataUpdate from '@data/api/hooks/useTimedDataUpdate.native';
import Login from './Login.native';

const RootStackNavigator = () => {
  const { showSplashScreen } = useMainState();

  usePlaySplashScreen();
	// This will handle navigation to whatever the correct screen
  useInitUserData();
  useTimedDataUpdate();
	
  return (
    <Condition 
      condition={!showSplashScreen}
      conditionalElement={<Landing />}
    >
      <I18nextProvider i18n={i18n}>
				<Login />
      </I18nextProvider>
    </Condition>
  );
};

export default RootStackNavigator;