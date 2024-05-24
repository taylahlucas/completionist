import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList } from '@utils/CustomInterfaces';
import Locations from '@screens/Locations.native';
import Quests from '@screens/Quests.native';
import Miscellaneous from '@screens/Miscellaneous.native';
import Collectables from '@screens/Collectables.native';
import useMainState from '@redux/hooks/useMainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import Condition from '@components/general/Condition.native';
import { NavigationDrawerContainer } from './NavigationStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import SendRequest from '@screens/SendRequest.native';
import SteamAchievements from '@screens/SteamAchievements.native';
import Subscriptions from '@screens/Subscriptions.native';
import NavigationDrawerBody from './NavigationDrawerBody.native';
import { styles } from './NavigationStyledComponents.native';
import Payments from '@screens/Payments.native';
import AccountDetails from '@screens/AccountDetails.native';
import SelectPlan from '@screens/SelectPlan.native';
import Settings from '@screens/Settings.native';
import Achievements from '@screens/Achievements.native';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const AuthDrawerStackNavigator = () => {
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
			initialRouteName={DrawerScreenEnum.Quests}
			screenOptions={{
				headerShown: false,
				drawerStyle: {
					...styles.drawerContainer,
					backgroundColor: theme.darkGrey
				}
			}}
		>
			<Drawer.Screen name={DrawerScreenEnum.Quests} component={Quests} />
			<Drawer.Screen name={DrawerScreenEnum.Collectables} component={Collectables} />
			<Drawer.Screen name={DrawerScreenEnum.Miscellaneous} component={Miscellaneous} />
			<Drawer.Screen name={DrawerScreenEnum.Locations} component={Locations} />
			<Drawer.Screen name={DrawerScreenEnum.SendRequest} component={SendRequest} />
			<Drawer.Screen name={DrawerScreenEnum.SteamAchievements} component={SteamAchievements} />
			<Drawer.Screen name={DrawerScreenEnum.Achievements} component={Achievements} />
			<Drawer.Screen name={DrawerScreenEnum.Subscriptions} component={Subscriptions} />
			<Drawer.Screen name={DrawerScreenEnum.SelectPlan} component={SelectPlan} />
			<Drawer.Screen name={DrawerScreenEnum.Payments} component={Payments} />
			<Drawer.Screen name={DrawerScreenEnum.Settings} component={Settings} />
			<Drawer.Screen name={DrawerScreenEnum.AccountDetails} component={AccountDetails} />
		</Drawer.Navigator>
	);
};

export default AuthDrawerStackNavigator;