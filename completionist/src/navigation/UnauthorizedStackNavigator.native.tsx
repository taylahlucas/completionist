import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '@screens/Landing.native';
import SelectFirstGame from '@screens/SignupFlow/SelectFirstGame/SelectFirstGame.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import { UnauthorizedStackParamList } from '@utils/CustomInterfaces';
import LinkAccount from '@screens/SignupFlow/VerifyAccount/LinkAccount.native';
// import Payments from '@screens/Payments.native';
import Login from '@screens/Login/Login.native';
import ForgotPassword from '@screens/Login/ForgotPassword.native';
import VerifyNewPassword from '@screens/Settings/VerifyNewPassword.native';
import SetUsername from '@screens/SignupFlow/SetUsername/SetUsername.native';
import VerifyAccount from '@screens/SignupFlow/VerifyAccount/VerifyAccount';

const Stack = createStackNavigator<UnauthorizedStackParamList>();

const UnauthorizedStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={UnauthorizedScreenEnum.Login}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={UnauthorizedScreenEnum.Landing} component={Landing} />
      <Stack.Screen name={UnauthorizedScreenEnum.Login} component={Login} />
      <Stack.Screen
        name={UnauthorizedScreenEnum.VerifyAccount}
        component={VerifyAccount}
      />
      <Stack.Screen
        name={UnauthorizedScreenEnum.SelectFirstGame}
        component={SelectFirstGame}
      />
      <Stack.Screen
        name={UnauthorizedScreenEnum.SetUsername}
        component={SetUsername}
      />
      <Stack.Screen
        name={UnauthorizedScreenEnum.LinkAccount}
        component={LinkAccount}
      />
      <Stack.Screen
        name={UnauthorizedScreenEnum.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={UnauthorizedScreenEnum.VerifyNewPassword}
        component={VerifyNewPassword}
      />
    </Stack.Navigator>
  );
};

export default UnauthorizedStackNavigator;
