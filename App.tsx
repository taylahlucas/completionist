import React from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import configureStore, { persistor } from '@redux/store';
import config from '@utils/configs/config';
import { Landing, RootStackNavigator } from '@screens/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { queryClient } from 'src/api';

GoogleSignin.configure({
  webClientId: config.webClientId,
});

const store = configureStore;

const App = () => {
  return (
    <Provider store={store}>
      {/* // TODO: Remove PersistGate now that we are using tanstack ? */}
      <PersistGate loading={<Landing />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <RootStackNavigator />
            </NavigationContainer>
            {__DEV__ && <DevToolsBubble queryClient={queryClient} />}
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
