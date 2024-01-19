import { useRef } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import configureStore from '@redux/store';
import config from '@utils/config';

const useInitializeApp = () => {
  const initializeApp = async () => {
    GoogleSignin.configure({
      webClientId: config.webClientId
    });
    const store = configureStore;

    if (!!store) {

    }
  };

  return { initializeApp };
};

export default useInitializeApp;