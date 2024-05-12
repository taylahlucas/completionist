import React from 'react';
import StyledText from '@components/general/Text/StyledText.native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Miscellaneous from '@screens/Miscellaneous.native';
import Collectables from '@screens/Collectables.native';
import GameSelection from '@screens/GameSelection.native';
import Locations from '@screens/Locations.native';
import Quests from '@screens/Quests.native';
import { AuthStackParamList } from '@utils/CustomInterfaces';
import { AuthScreenEnum } from '@utils/CustomEnums';
import NavigationDrawerBody from './NavigationDrawerBody.native';
import { styles, NavigationDrawerContainer } from './NavigationStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import Settings from '@screens/Settings.native';
import Condition from '@components/general/Condition.native';
import SendRequest from '@screens/SendRequest.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import Subscriptions from '@screens/Subscriptions.native';
import Payments from '@screens/Payments.native';
import SteamAchievements from '@screens/SteamAchievements.native';
import AccountDetails from '@screens/AccountDetails.native';
import SelectPlan from '@screens/SelectPlan.native';
import Landing from '@screens/Landing.native';

const Drawer = createDrawerNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
	const theme = useGetTheme();
	const { selectedGame } = useMainState();
	const { translateGameName } = useTranslateGameContent();

	const NavigationDrawerContent = (): JSX.Element => {
		return (
			<Condition condition={!!selectedGame}>
				<NavigationDrawerContainer>
					<StyledText
						type={'SubHeading'}
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
			backBehavior='history'
			drawerContent={(): JSX.Element => <NavigationDrawerContent />}
			initialRouteName={AuthScreenEnum.GameSelection}
			screenOptions={{
				headerShown: false,
				drawerStyle: {
					...styles.drawerContainer,
					backgroundColor: theme.darkGrey
				}
			}}
		>
			<Drawer.Screen name={AuthScreenEnum.Landing} component={Landing} />
			<Drawer.Screen name={AuthScreenEnum.GameSelection} component={GameSelection} />
			<Drawer.Screen name={AuthScreenEnum.Quests} component={Quests} />
			<Drawer.Screen name={AuthScreenEnum.Collectables} component={Collectables} />
			<Drawer.Screen name={AuthScreenEnum.Miscellaneous} component={Miscellaneous} />
			<Drawer.Screen name={AuthScreenEnum.Locations} component={Locations} />
			<Drawer.Screen name={AuthScreenEnum.SendRequest} component={SendRequest} />
			<Drawer.Screen name={AuthScreenEnum.SteamAchievements} component={SteamAchievements} />
			<Drawer.Screen name={AuthScreenEnum.Subscriptions} component={Subscriptions} />
			<Drawer.Screen name={AuthScreenEnum.SelectPlan} component={SelectPlan} />
			<Drawer.Screen name={AuthScreenEnum.Payments} component={Payments} />
			<Drawer.Screen name={AuthScreenEnum.Settings} component={Settings} />
			<Drawer.Screen name={AuthScreenEnum.AccountDetails} component={AccountDetails} />
		</Drawer.Navigator>
	);
};

export default AuthStackNavigator;