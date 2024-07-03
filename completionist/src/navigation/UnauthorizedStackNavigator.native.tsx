import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '@screens/Landing.native';
import SelectFirstGame from '@screens/SelectFirstGame.native';
import AccountVerification from '@screens/AccountVerification.native';
import SelectInitialPlan from '@screens/SelectInitialPlan.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import { UnauthorizedStackParamList } from '@utils/CustomInterfaces';
import LinkAccount from '@screens/LinkAccount.native';
import Payments from '@screens/Payments.native';
import Login from '@screens/Login.native';
import ForgotPassword from '@screens/ForgotPassword.native';
import VerifyNewPassword from '@screens/VerifyNewPassword.native';
import SetUsername from '@screens/SetUsername.native';

const Stack = createStackNavigator<UnauthorizedStackParamList>();

const UnauthorizedStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={UnauthorizedScreenEnum.Login}
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name={UnauthorizedScreenEnum.Landing} component={Landing} />
			<Stack.Screen name={UnauthorizedScreenEnum.Login} component={Login} />
			<Stack.Screen name={UnauthorizedScreenEnum.AccountVerification} component={AccountVerification} />
			<Stack.Screen name={UnauthorizedScreenEnum.SelectInitialPlan} component={SelectInitialPlan} />
			<Stack.Screen name={UnauthorizedScreenEnum.Payments} component={Payments} />
			<Stack.Screen name={UnauthorizedScreenEnum.SelectFirstGame} component={SelectFirstGame} />
			<Stack.Screen name={UnauthorizedScreenEnum.SetUsername} component={SetUsername} />
			<Stack.Screen name={UnauthorizedScreenEnum.LinkAccount} component={LinkAccount} />
			<Stack.Screen name={UnauthorizedScreenEnum.ForgotPassword} component={ForgotPassword} />
			<Stack.Screen name={UnauthorizedScreenEnum.VerifyNewPassword} component={VerifyNewPassword} />
		</Stack.Navigator>
	);
};

export default UnauthorizedStackNavigator;