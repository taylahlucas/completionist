import { useMemo } from 'react';
import { ImageURISource } from 'react-native';
import useMainState from '@redux/hooks/useMainState';
import { useTranslateGameContent } from '@data/hooks';
import useGetTheme from '@styles/hooks/useGetTheme';
import { GameKeyEnum } from '@utils/CustomEnums';
import { allGameData } from '@utils/configs/gameConfigs';
import { getPriceForGame } from '@data/hooks';

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
