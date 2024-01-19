import React from 'react';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import Home from './Home.native';
import Login from './Login.native';
import useInitUserData from '@data/hooks/useInitUserData.native';
import Landing from './Landing.native';
import usePlaySplashScreen from '@utils/hooks/usePlaySplashScreen.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';

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
      <Condition 
        condition={isLoggedIn && !!user.userId}
        conditionalElement={<Login />}
      >
        <Home />
      </Condition>
    </Condition>
  );
};

export default RootStackNavigator;