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


// Translations

// export const useUpdateLocale = (): void => {
//   const { data, error } = useGetLocaleQuery();

//   if (error) {
//     console.warn(error);
//   }

//   useEffect(() => {
//     if (data?.me?.localeName) {
//       storage.set(StorageKeyEnum.Language, data?.me?.localeName);
//       i18next.changeLanguage(data.me.localeName).then(() => updateMoment(moment, data.me.localeName));
//     }
//   }, [data?.me?.localeName]);
// };

// const AppNavigation: React.FunctionComponent = (): JSX.Element => {
//   const { isLoggedIn } = useLoginState();

//   useOrientationLock();
//   useSplashScreenOnReady();

//   return (
//     <ApolloClientContainer>
//       <I18nextProvider i18n={i18n}>
//         {isLoggedIn ? <AuthenticatedStackNavigator /> : <UnauthenticatedStackNavigator />}
//       </I18nextProvider>
//     </ApolloClientContainer>
//   );
// };
// export default AppNavigation;