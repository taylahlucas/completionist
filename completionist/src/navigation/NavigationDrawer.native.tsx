import React from 'react';
import StyledText from '@components/general/Text/StyledText.native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Miscellaneous from '@screens/Miscellaneous.native';
import Collectables from '@screens/Collectables.native';
import Home from '@screens/Home.native';
import Locations from '@screens/Locations.native';
import Login from '@screens/Login.native';
import Quests from '@screens/Quests.native';
import RootStackNavigator from '@screens/RootStackNavigator.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { RootDrawerParamList } from '@utils/CustomInterfaces';
import NavigationDrawerBody from './NavigationDrawerBody.native';
import style, { NavigationDrawerContainer } from './NavigationStyledComponents.native';
import Signup from '@screens/Signup.native';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const NavigationDrawer = () => {
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
      initialRouteName={ScreenEnum.RootStackNavigator}
      screenOptions={{
        headerShown: false,
        drawerStyle: style.drawerContainer
      }}
    >
      <Drawer.Screen name={ScreenEnum.RootStackNavigator} component={RootStackNavigator} />
      {/* <Drawer.Screen name={ScreenEnum.Landing} component={Landing} /> */}
      <Drawer.Screen name={ScreenEnum.Login} component={Login} />
      <Drawer.Screen name={ScreenEnum.Signup} component={Signup} />
      <Drawer.Screen name={ScreenEnum.Home} component={Home} />
      <Drawer.Screen name={ScreenEnum.Quests} component={Quests} />
      <Drawer.Screen name={ScreenEnum.Collectables} component={Collectables} />
      <Drawer.Screen name={ScreenEnum.Miscellaneous} component={Miscellaneous} />
      <Drawer.Screen name={ScreenEnum.Locations} component={Locations} />
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;