import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import NavigationDrawer from '@navigation/NavigationDrawer.native';
import configureStore from '@redux/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const store = configureStore;

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '564447398670-mb8p4utaa5fsabm7fgm53rvu5mo6tbe7.apps.googleusercontent.com',
    });
  }, []);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationDrawer />
      </NavigationContainer>
    </Provider>
  )
};

export default App;
