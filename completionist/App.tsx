import React, { useEffect } from 'react';
import Home from './src/screens/Home.native';
import Login from './src/screens/Login.native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '564447398670-mb8p4utaa5fsabm7fgm53rvu5mo6tbe7.apps.googleusercontent.com',
    });
    
  }, []);
  
  return (
    <Login />
  )
};

export default App;
