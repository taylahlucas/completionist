import React from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from '@redux/store';
import config from '@utils/configs/config';
import { RootStackNavigator } from '@screens/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId: config.webClientId,
});

const store = configureStore;

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
