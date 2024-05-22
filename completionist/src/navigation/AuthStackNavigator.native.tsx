import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameSelection from '@screens/GameSelection.native';
import { AuthStackParamList } from '@utils/CustomInterfaces';
import { AuthScreenEnum } from '@utils/CustomEnums';
import Subscriptions from '@screens/Subscriptions.native';
import Landing from '@screens/Landing.native';
import AuthDrawerStackNavigator from './AuthDrawerStackNavigator.native';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={AuthScreenEnum.GameSelection}
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name={AuthScreenEnum.Landing} component={Landing} />
			<Stack.Screen name={AuthScreenEnum.GameSelection} component={GameSelection} />
			<Stack.Screen name={AuthScreenEnum.Subscriptions} component={Subscriptions} />
			<Stack.Screen name={AuthScreenEnum.DrawerStack} component={AuthDrawerStackNavigator} />
		</Stack.Navigator>
	);
};

export default AuthStackNavigator;