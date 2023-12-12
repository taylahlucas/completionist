import React from 'react';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import Quests from './Quests.native';
import Login from './Login.native';
import useInitUserData from '@data/hooks/useInitUserData.native';

const RootStackNavigator = () => {
  const { isLoggedIn, user } = useMainState();

  useInitUserData();
  
  return (
    <Condition 
      condition={isLoggedIn && !!user}
      conditionalElement={<Login />}
    >
      <Quests />
    </Condition>
  );
};

export default RootStackNavigator;