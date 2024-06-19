import React, { useEffect } from 'react';
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
import { windowHeight } from '@styles/global.native';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';

const RootStackNavigator = () => {
	const { showSplashScreen } = useMainState();
	const { isAuthenticated } = useLoginState();
	const { checkUserExists } = useAuthEndpoints();

	usePlaySplashScreen();
	useInitUserData();
	useTimedDataUpdate();

	// useEffect(() => {
	// 	checkUserExists('taylahlucas@gmail.com');
	// }, [])

	return (
		<Condition
			condition={!showSplashScreen}
			conditionalElement={<Landing />}
		>
			<I18nextProvider i18n={i18n}>
				{!isAuthenticated ? <UnauthorizedStackNavigator /> : <AuthStackNavigator />}
			</I18nextProvider>
		</Condition>
	);
};

export default RootStackNavigator;