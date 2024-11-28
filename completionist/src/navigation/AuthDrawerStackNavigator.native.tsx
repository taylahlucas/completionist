import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList } from '@utils/CustomInterfaces';
import Locations from '@screens/GameContent/Locations.native';
import Quests from '@screens/GameContent/Quests.native';
import Miscellaneous from '@screens/GameContent/Miscellaneous.native';
import Collectables from '@screens/GameContent/Collectables.native';
import useMainState from '@redux/hooks/useMainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import {useTranslateGameContent} from '@data/hooks/index';
import {Condition} from '@components/general/index';
import { NavigationDrawerContainer } from './NavigationStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import SendRequest from '@screens/SendRequest.native';
import SteamAchievements from '@screens/Achievements/SteamAchievements.native';
import NavigationDrawerBody from './NavigationDrawerBody.native';
import { styles } from './NavigationStyledComponents.native';
import Payments from '@screens/Payments.native';
import AccountDetails from '@screens/Settings/AccountDetails.native';
import Settings from '@screens/Settings/Settings.native';
import Achievements from '@screens/Achievements/Achievements.native';

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
						{!!selectedGame ? translateGameName(selectedGame?.id) : ''}
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
			<Drawer.Screen name={DrawerScreenEnum.Achievements} component={Achievements} />
			<Drawer.Screen name={DrawerScreenEnum.SteamAchievements} component={SteamAchievements} />
			<Drawer.Screen name={DrawerScreenEnum.Payments} component={Payments} />
			<Drawer.Screen name={DrawerScreenEnum.Settings} component={Settings} />
			<Drawer.Screen name={DrawerScreenEnum.AccountDetails} component={AccountDetails} />
		</Drawer.Navigator>
	);
};

export default AuthDrawerStackNavigator;