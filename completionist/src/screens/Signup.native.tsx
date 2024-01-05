import React from 'react';
import { ScrollView, View } from 'react-native';
import StandardLayout from '../components/general/Layouts/StandardLayout.native';
import LoginForm from '@components/custom/LoginForm/LoginForm.native';
import LoginFormSignInButtons from '@components/custom/LoginForm/LoginFormSignInButtons.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Signup = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Completionist.'} leftAction={'back'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{ height: '100%', alignItems: 'center' }}>
            <LoginForm />
            <LoginFormSignInButtons />
          </View>
        </ScrollView>
    </StandardLayout>
  );
};

export default Signup;