import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList } from '@utils/custom-interfaces';
import {
  Quests,
  Collectables,
  Miscellaneous,
  Locations,
} from '@screens/game-content';
import { useMainState } from '@redux/hooks';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useTranslateGameContent } from '@data/hooks';
import { Condition } from '@components/general';
import StyledText from '@components/general/text/styled-text';
import { DrawerScreenEnum } from '@utils/custom-enums';
import SendRequest from '@screens/send-request';
import { Achievements, SteamAchievements } from '@screens/achievements';
import {
  navigationStyles,
  NavigationDrawerBody,
  NavigationDrawerContainer,
} from '.';
import Payments from '@screens/payments';
import AccountDetails from '@screens/settings/account-details';
import Settings from '@screens/settings/settings';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export const AuthDrawerStackNavigator = () => {
  const theme = useGetTheme();
  const { selectedGame } = useMainState();
  const { translateGameName } = useTranslateGameContent();

  const NavigationDrawerContent = (): JSX.Element => {
    return (
      <Condition condition={!!selectedGame}>
        <NavigationDrawerContainer>
          <StyledText type={'SubHeading'} color={theme.lightGrey}>
            {!!selectedGame ? translateGameName(selectedGame?.id) : ''}
          </StyledText>
          <NavigationDrawerBody />
        </NavigationDrawerContainer>
      </Condition>
    );
  };

  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(): JSX.Element => <NavigationDrawerContent />}
      initialRouteName={DrawerScreenEnum.Quests}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          ...navigationStyles.drawerContainer,
          backgroundColor: theme.darkGrey,
        },
      }}>
      <Drawer.Screen name={DrawerScreenEnum.Quests} component={Quests} />
      <Drawer.Screen
        name={DrawerScreenEnum.Collectables}
        component={Collectables}
      />
      <Drawer.Screen
        name={DrawerScreenEnum.Miscellaneous}
        component={Miscellaneous}
      />
      <Drawer.Screen name={DrawerScreenEnum.Locations} component={Locations} />
      <Drawer.Screen
        name={DrawerScreenEnum.SendRequest}
        component={SendRequest}
      />
      <Drawer.Screen
        name={DrawerScreenEnum.Achievements}
        component={Achievements}
      />
      <Drawer.Screen
        name={DrawerScreenEnum.SteamAchievements}
        component={SteamAchievements}
      />
      <Drawer.Screen name={DrawerScreenEnum.Payments} component={Payments} />
      <Drawer.Screen name={DrawerScreenEnum.Settings} component={Settings} />
      <Drawer.Screen
        name={DrawerScreenEnum.AccountDetails}
        component={AccountDetails}
      />
    </Drawer.Navigator>
  );
};
