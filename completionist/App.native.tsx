import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Quests from './src/screens/Quests.native';
import Locations from '@screens/Locations.native';
import Collectables from '@screens/Collectables.native';
import NavigationDrawer from '@navigation/NavigationDrawer.native';

const App = () => {
  return (
    <NavigationContainer>
      {/* <Collectables /> */}
      <NavigationDrawer title={'Skyrim'} />
    </NavigationContainer>
  )
};

export default App;
