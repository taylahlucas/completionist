import React from 'react';
import { I18nextProvider } from 'react-i18next';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import useInitUserData from '@data/hooks/useInitUserData.native';
import Landing from './Landing.native';
import usePlaySplashScreen from '@utils/hooks/usePlaySplashScreen.native';
import i18n from 'src/i18n/i18n.native';
import useTimedDataUpdate from '@data/api/hooks/useTimedDataUpdate.native';
import AuthStackNavigator from '@navigation/AuthStackNavigator.native';
import UnauthorizedStackNavigator from '@navigation/UnauthorizedStackNavigator.native';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';

const RootStackNavigator = () => {
	const { showSplashScreen } = useMainState();
	const { isAuthenticated } = useLoginState();

	usePlaySplashScreen();
	useInitUserData();
	useTimedDataUpdate();

	return (
		<I18nextProvider i18n={i18n}>
			{!isAuthenticated ? <UnauthorizedStackNavigator /> : <AuthStackNavigator />}
		</I18nextProvider>
	);
};

export default RootStackNavigator;

// TODO: Splash screen causing navigation issue
// <Condition
// condition={!showSplashScreen}
// conditionalElement={<Landing />}
// >
// <I18nextProvider i18n={i18n}>
// 	{!isAuthenticated ? <UnauthorizedStackNavigator /> : <AuthStackNavigator />}
// </I18nextProvider>
// </Condition>