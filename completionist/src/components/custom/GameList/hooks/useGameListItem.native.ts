import { useMemo } from 'react';
import { ImageURISource } from 'react-native';
import useMainState from '@redux/hooks/useMainState';
import { useTranslateGameContent } from '@data/hooks/index';
import useGetTheme from '@styles/hooks/useGetTheme';
import { GameKeyEnum } from '@utils/CustomEnums';
import { allGameData } from '@utils/configs/gameConfigs';

export const useGameListItem = () => {
  const theme = useGetTheme();
  const { user } = useMainState();
  const { translateGameName } = useTranslateGameContent();

  const disabledGameData = useMemo(
    () =>
      allGameData.filter(game => {
        if (!user.gameData?.find(activeGame => activeGame.id === game.id)) {
          return true;
        }
      }),
    [user.gameData],
  );

  const getPriceForGame = (id: GameKeyEnum): string => {
    // TODO: Input game prices
    switch (id) {
      default:
        return '£3.99';
    }
  };

  const getGameImage = (game: GameKeyEnum): ImageURISource => {
    switch (game) {
      case GameKeyEnum.ELDEN_RING:
        return require('@styles/images/games/eldenring.jpg');
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

  return {
    viewModel: {
      activeGames: user.gameData,
      disabledGames: disabledGameData,
      theme,
    },
    actions: {
      translateGameName,
      getGameImage,
      getPriceForGame,
    },
  };
};

// TODO: Refactor
// switch (user.subscription.tier) {
// 	case SubscriptionTypeEnum.FREE:
// 		if (user.subscription.changesLeft > 0) {
// 			const newChangesLeft = user.subscription.changesLeft - 1;
// 			Alert.alert(
// 				`${t('common:alerts.cta.activate')} ${gameName}?`,
// 				t('common:alerts.changesLeft',
// 					{
// 						changesLeft: newChangesLeft,
// 						s: newChangesLeft === 1 ? 's' : ''
// 					}
// 				),
// 				[
// 					{
// 						text: t('common:alerts.cta.activate'),
// 						onPress: () => changeGameSubscription(user, game, newChangesLeft)
// 					},
// 					{
// 						text: t('common:alerts.cta.cancel'),
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
// 			`${t('common:alerts.cta.activate')} ${gameName}?`,
// 			'',
// 			[
// 				{
// 					text: t('common:alerts.cta.activate'),
// 					onPress: () => activateGameSubscription(user, game)
// 				},
// 				{
// 					text: t('common:alerts.cta.cancel'),
// 					style: 'cancel'
// 				}
// 			]
// 		);
// 		break;
// }
