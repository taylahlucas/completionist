import React from 'react';
// import { I18nextProvider } from 'react-i18next';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import GameSelection from './GameSelection.native';
import Login from './Login.native';
import useInitUserData from '@data/hooks/useInitUserData.native';
import Landing from './Landing.native';
import usePlaySplashScreen from '@utils/hooks/usePlaySplashScreen.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
// import i18n from 'src/i18n/i18n';

const RootStackNavigator = () => {
  const { isLoggedIn } = useLoginState();
  const { showSplashScreen, user } = useMainState();

  usePlaySplashScreen();
  useInitUserData();

  return (
    <Condition 
      condition={!showSplashScreen}
      conditionalElement={<Landing />}
    >
      {/* <I18nextProvider i18n={i18n}> */}
        <Condition 
          condition={isLoggedIn && !!user.userId}
          conditionalElement={<Login />}
        >
          <GameSelection />
        </Condition>
      {/* </I18nextProvider> */}
    </Condition>
  );
};

export default RootStackNavigator;