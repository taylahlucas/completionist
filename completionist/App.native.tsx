import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import config from '@utils/config';
import NavigationDrawer from '@navigation/NavigationDrawer.native';
import configureStore from '@redux/store';
import ApolloClientContainer from '@navigation/ApolloClientContainer.native';

const store = configureStore;

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.webClientId
    });
  }, []);

  return (
    <Provider store={store}>
      <ApolloClientContainer>
        <NavigationContainer>
          <NavigationDrawer />
        </NavigationContainer>
      </ApolloClientContainer>
    </Provider>
  )
};

export default App;
