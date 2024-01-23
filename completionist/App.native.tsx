import React from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import NavigationDrawer from '@navigation/NavigationDrawer.native';
import configureStore from '@redux/store';
import config from '@utils/config';

GoogleSignin.configure({
  webClientId: config.webClientId
});

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
