import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import NavigationDrawer from '@navigation/NavigationDrawer.native';
import configureStore from './src/redux/store.native';

const store = configureStore;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationDrawer />
      </NavigationContainer>
    </Provider>
  )
};

export default App;
