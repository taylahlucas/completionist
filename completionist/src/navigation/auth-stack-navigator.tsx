import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameSelection from '@screens/game-selection';
import { AuthStackParamList } from '@utils/custom-interfaces';
import { AuthScreenEnum } from '@utils/custom-enums';
import Settings from '@screens/settings/settings';
import AccountDetails from '@screens/settings/account-details';
import Landing from '@screens/landing';
import { GlobalAchievements, SteamAchievements } from '@screens/achievements';
import { AuthDrawerStackNavigator } from '.';
import PurchaseGame from '@screens/purchase-game/purchase-game';

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
