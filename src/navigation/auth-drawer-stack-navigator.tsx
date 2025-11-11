import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList, DrawerScreenEnum } from '@utils/index';
import { useMainState } from '@redux/hooks';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useTranslateGameContent } from '@data/hooks';
import { Condition, StyledText } from '@components/general';
import {
  navigationStyles,
  NavigationDrawerBody,
  NavigationDrawerContainer,
} from './';
import {
  Quests,
  Collectables,
  Miscellaneous,
  Locations,
  AccountDetails,
  GameSettings,
  SendRequest,
  Achievements,
  LinkSteamProfile,
} from '@screens/index';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export const AuthDrawerStackNavigator = () => {
  const theme = useGetTheme();
  const { selectedGameData } = useMainState();
  const { translateGameName } = useTranslateGameContent();

  const NavigationDrawerContent = (): JSX.Element => {
    return (
      <Condition condition={!!selectedGameData}>
        <NavigationDrawerContainer>
          <StyledText type={'SubHeading'} color={theme.lightGrey}>
            {!!selectedGameData ? translateGameName(selectedGameData?.id) : ''}
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
        name={DrawerScreenEnum.LinkSteamProfile}
        component={LinkSteamProfile}
      />
      <Drawer.Screen
        name={DrawerScreenEnum.GameSettings}
        component={GameSettings}
      />
      <Drawer.Screen
        name={DrawerScreenEnum.AccountDetails}
        component={AccountDetails}
      />
    </Drawer.Navigator>
  );
};
