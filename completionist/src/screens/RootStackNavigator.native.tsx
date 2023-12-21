import React from 'react';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import Home from './Home.native';
import Login from './Login.native';
import useInitUserData from '@data/hooks/useInitUserData.native';

const RootStackNavigator = () => {
  const { isLoggedIn, user } = useMainState();

  // TODO: Debug here check commenting out settings hook
  useInitUserData();

  return (
    <Condition 
      condition={isLoggedIn && !!user.userId}
      conditionalElement={<Login />}
    >
      <Home />
    </Condition>
  );
};

export default RootStackNavigator;