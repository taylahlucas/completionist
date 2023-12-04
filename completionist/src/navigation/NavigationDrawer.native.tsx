import StyledText from '@components/general/Text/StyledText.native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Collectables from '@screens/Collectables.native';
import Locations from '@screens/Locations.native';
import Quests from '@screens/Quests.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { RootDrawerParamList } from '@utils/CustomTypes';
import React from 'react';
import NavigationDrawerBody from './NavigationDrawerBody.native';
import style, { NavigationDrawerContainer } from './NavigationStyledComponents.native';

interface NavigationSideMenuProps {
  title: string;
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const NavigationDrawer = ({ title }: NavigationSideMenuProps) => {
  const NavigationDrawerContent = (): JSX.Element => {
    return (
      <NavigationDrawerContainer>
        <StyledText>Skyrim</StyledText>
        <NavigationDrawerBody />
      </NavigationDrawerContainer>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(): JSX.Element => <NavigationDrawerContent />}
      initialRouteName={ScreenEnum.Quests}
      screenOptions={{
        headerShown: false,
        drawerStyle: style.drawerContainer
      }}
    >
      <Drawer.Screen name={ScreenEnum.Quests} component={Quests} />
      <Drawer.Screen name={ScreenEnum.Collectables} component={Collectables} />
      <Drawer.Screen name={ScreenEnum.Locations} component={Locations} />
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;