import React from 'react';
import StyledText from '@components/general/Text/StyledText.native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Miscellaneous from '@screens/Miscellaneous.native';
import Collectables from '@screens/Collectables.native';
import GameSelection from '@screens/GameSelection.native';
import Locations from '@screens/Locations.native';
import Login from '@screens/Login.native';
import Quests from '@screens/Quests.native';
import RootStackNavigator from '@screens/RootStackNavigator.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { RootDrawerParamList } from '@utils/CustomInterfaces';
import NavigationDrawerBody from './NavigationDrawerBody.native';
import { styles, NavigationDrawerContainer } from './NavigationStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import Settings from '@screens/Settings.native';
import Condition from '@components/general/Condition.native';
import RequestGame from '@screens/RequestGame.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import Landing from '@screens/Landing.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import Subscriptions from '@screens/Subscriptions.native';
import Payments from '@screens/Payments.native';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const NavigationDrawer = () => {
	const theme = useGetTheme();
	const { selectedGame } = useMainState();
	const { translateGameName } = useTranslateGameContent();

	const NavigationDrawerContent = (): JSX.Element => {
		return (
			<Condition condition={!!selectedGame}>
				<NavigationDrawerContainer>
					<StyledText
						type={'Heading'}
						color={theme.lightGrey}>
						{!!selectedGame ? translateGameName(selectedGame) : ''}
					</StyledText>
					<NavigationDrawerBody />
				</NavigationDrawerContainer>
			</Condition>
		);
	};

	return (
		<Drawer.Navigator
			drawerContent={(): JSX.Element => <NavigationDrawerContent />}
			initialRouteName={ScreenEnum.RootStackNavigator}
			screenOptions={{
				headerShown: false,
				drawerStyle: {
					...styles.drawerContainer,
					backgroundColor: theme.darkGrey
				}
			}}
		>
			<Drawer.Screen name={ScreenEnum.RootStackNavigator} component={RootStackNavigator} />
			<Drawer.Screen name={ScreenEnum.Landing} component={Landing} />
			<Drawer.Screen name={ScreenEnum.Login} component={Login} />
			<Drawer.Screen name={ScreenEnum.GameSelection} component={GameSelection} />
			<Drawer.Screen name={ScreenEnum.Quests} component={Quests} />
			<Drawer.Screen name={ScreenEnum.Collectables} component={Collectables} />
			<Drawer.Screen name={ScreenEnum.Miscellaneous} component={Miscellaneous} />
			<Drawer.Screen name={ScreenEnum.Locations} component={Locations} />
			<Drawer.Screen name={ScreenEnum.RequestGame} component={RequestGame} />
			<Drawer.Screen name={ScreenEnum.Subscriptions} component={Subscriptions} />
			<Drawer.Screen name={ScreenEnum.Payments} component={Payments} />
			<Drawer.Screen name={ScreenEnum.Settings} component={Settings} />
		</Drawer.Navigator>
	);
};

export default NavigationDrawer;