import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import NavigationDrawer from '@navigation/NavigationDrawer.native';
import configureStore from '@redux/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import config from '@utils/config';

const store = configureStore;

const App = () => { 
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.webClientId
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
