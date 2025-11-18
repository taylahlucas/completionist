import React from 'react';
import {
  UnAuthorizedScreenEnum,
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

export const UnAuthorizedStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={UnAuthorizedScreenEnum.Login}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={UnAuthorizedScreenEnum.Landing} component={Landing} />
      <Stack.Screen name={UnAuthorizedScreenEnum.Login} component={Login} />
      <Stack.Screen
        name={UnAuthorizedScreenEnum.VerifyAccount}
        component={VerifyAccount}
      />
      <Stack.Screen
        name={UnAuthorizedScreenEnum.SelectFirstGame}
        component={SelectFirstGame}
      />
      <Stack.Screen
        name={UnAuthorizedScreenEnum.SetUsername}
        component={SetUsername}
      />
      <Stack.Screen
        name={UnAuthorizedScreenEnum.LinkAccount}
        component={LinkAccount}
      />
      <Stack.Screen
        name={UnAuthorizedScreenEnum.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={UnAuthorizedScreenEnum.VerifyNewPassword}
        component={VerifyNewPassword}
      />
    </Stack.Navigator>
  );
};
