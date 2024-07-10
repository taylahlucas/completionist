import useMainState from '@redux/hooks/useMainState';
import useFilterGameList from './useFilterGameList.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { AuthScreenEnum, GameKeyEnum } from '@utils/CustomEnums';
import { ImageURISource } from 'react-native';
import { ActiveGameData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';

interface GamePrice {
	id: GameKeyEnum;
	price: string;
}

export const useGameListItem = () => {
	const theme = useGetTheme();
	const navigation = useReactNavigation();
  const { user, currentScreen } = useMainState();
	const { setSelectedGame, setSelectedGameSettings } = useMainDispatch();
	const { filterGameList } = useFilterGameList();
	const { translateGameName } = useTranslateGameContent();
	
	// TODO: Update with actual price for game
	const gamePrices: GamePrice[]  = user.activeGames.map((game) => (
		{ id: game.id, price: '£3.99' }
	));
	
	const getPriceForGame = (game: GameKeyEnum): string => {
		return gamePrices?.find((gamePrice: GamePrice) => game === gamePrice.id)?.price ?? '';
	};
		
	const getGameImage = (game: GameKeyEnum): ImageURISource => {
    switch (game) {
			case GameKeyEnum.FALLOUT_3:
				return require('@styles/images/games/fallout3.jpg');
			case GameKeyEnum.FALLOUT_4:
				return require('@styles/images/games/fallout4.jpg');
      case GameKeyEnum.SKYRIM:
        return require('@styles/images/games/skyrim.jpg');
			case GameKeyEnum.WITCHER_3:
				return require('@styles/images/games/witcher3.jpeg');
      default:
				// TODO: Change this to 'No image'
        return require('@styles/images/games/fallout4.jpg');
    }
  };

	const handleGameSelection = (game: ActiveGameData): void => {
		if (game.isActive) {
			setSelectedGame(game.id);
			setSelectedGameSettings(game.id);
			navigation.navigate(AuthScreenEnum.DrawerStack);
		}
		else {
			navigation.navigate(AuthScreenEnum.PurchaseGame, { gameId: game.id });
		}
	};

	return {
		viewModel: {
			activeGames: user.activeGames,
			currentScreen,
			theme,
		},
		actions: {
			filterGameList,
			translateGameName,
			getGameImage,
			handleGameSelection,
			getPriceForGame
		}
	};
};


			// TODO: Refactor
			// switch (user.subscription.tier) {
			// 	case SubscriptionTypeEnum.FREE:
			// 		if (user.subscription.changesLeft > 0) {
			// 			const newChangesLeft = user.subscription.changesLeft - 1;
			// 			Alert.alert(
			// 				`${t('common:alerts.activate')} ${gameName}?`,
			// 				t('common:alerts.changesLeft',
			// 					{
			// 						changesLeft: newChangesLeft,
			// 						s: newChangesLeft === 1 ? 's' : ''
			// 					}
			// 				),
			// 				[
			// 					{
			// 						text: t('common:alerts.activate'),
			// 						onPress: () => changeGameSubscription(user, game, newChangesLeft)
			// 					},
			// 					{
			// 						text: t('common:alerts.cancel'),
			// 						style: 'cancel'
			// 					}
			// 				]
			// 			);
			// 		}
			// 		else {
			// 			Alert.alert(
			// 				t('common:alerts.noChangesLeft'),
			// 				t('common:alerts.noChangesLeftMessage')
			// 			);
			// 		}
			// 		break;
			// 	case SubscriptionTypeEnum.PREMIUM:
			// 		Alert.alert(
			// 			`${t('common:alerts.activate')} ${gameName}?`,
			// 			'',
			// 			[
			// 				{
			// 					text: t('common:alerts.activate'),
			// 					onPress: () => activateGameSubscription(user, game)
			// 				},
			// 				{
			// 					text: t('common:alerts.cancel'),
			// 					style: 'cancel'
			// 				}
			// 			]
			// 		);
			// 		break;
			// }