import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameSelection from '@screens/GameSelection.native';
import { AuthStackParamList } from '@utils/CustomInterfaces';
import { AuthScreenEnum } from '@utils/CustomEnums';
import Settings from '@screens/Settings/Settings.native';
import AccountDetails from '@screens/Settings/AccountDetails.native';
import Landing from '@screens/Landing.native';
import { GlobalAchievements, SteamAchievements } from '@screens/achievements';
import { AuthDrawerStackNavigator } from '.';
import PurchaseGame from '@screens/PurchaseGame/PurchaseGame.native';

const Stack = createStackNavigator<AuthStackParamList>();

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
      <Stack.Screen name={AuthScreenEnum.GlobalSettings} component={Settings} />
      <Stack.Screen
        name={AuthScreenEnum.GlobalAccountDetails}
        component={AccountDetails}
      />
      <Stack.Screen
        name={AuthScreenEnum.GlobalAchievements}
        component={GlobalAchievements}
        options={{
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Stack.Screen
        name={AuthScreenEnum.GlobalSteamAchievements}
        component={SteamAchievements}
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
