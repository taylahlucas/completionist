import React from 'react';
import {
  UnauthorizedScreenEnum,
  UnauthorizedStackParamList,
} from '@utils/index';
import {
  LinkAccount,
  SelectFirstGame,
  Landing,
  Login,
  SetUsername,
  VerifyAccount,
  VerifyNewPassword,
} from '@screens/index';
import { ForgotPassword } from '@screens/forgot-password';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<UnauthorizedStackParamList>();

export const UnauthorizedStackNavigator = () => {
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
