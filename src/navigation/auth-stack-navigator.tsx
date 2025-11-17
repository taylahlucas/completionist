import React from 'react';
import { AuthStackParamList, AuthScreenEnum } from '@utils/index';
import { AuthDrawerStackNavigator } from './';
import {
  PurchaseGame,
  AccountDetails,
  Landing,
  GameSelection,
  GlobalSettings,
  SteamProfileSheet,
} from '@screens/index';
import { SelectGameLanguageSheet } from '@screens/select-game-language-sheet';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const bottomSheetOptions: NativeStackNavigationOptions = {
  presentation: 'transparentModal',
  headerShown: false,
};

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthScreenEnum.GameSelection}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AuthScreenEnum.Landing} component={Landing} />
      <Stack.Screen
        name={AuthScreenEnum.GameSelection}
        component={GameSelection}
      />
      <Stack.Screen
        name={AuthScreenEnum.GlobalSettings}
        component={GlobalSettings}
      />
      <Stack.Screen
        name={AuthScreenEnum.GlobalAccountDetails}
        component={AccountDetails}
      />
      <Stack.Screen
        name={AuthScreenEnum.SelectGameLanguage}
        component={SelectGameLanguageSheet}
        options={bottomSheetOptions}
      />
      {/* <Stack.Screen
        name={AuthScreenEnum.GlobalAchievements}
        component={GlobalAchievements}
        options={{
          gestureDirection: 'horizontal-inverted',
        }}
      /> */}
      {/* <Stack.Screen
        name={AuthScreenEnum.GlobalSteamAchievements}
        component={SteamAchievements}
      /> */}
      <Stack.Screen
        name={AuthScreenEnum.SteamProfile}
        component={SteamProfileSheet}
        options={bottomSheetOptions}
      />
      <Stack.Screen
        name={AuthScreenEnum.PurchaseGame}
        component={PurchaseGame}
      />
      <Stack.Screen
        name={AuthScreenEnum.DrawerStack}
        component={AuthDrawerStackNavigator}
      />
    </Stack.Navigator>
  );
};
