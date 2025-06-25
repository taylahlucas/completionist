import { useMemo } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { filterGameList } from './use-filter-game-list';
import { allGameData } from '@utils/configs/gameConfigs';

export const useGameList = () => {
  const { user } = useMainState();

  const disabledGameData = useMemo(
    () =>
      allGameData.filter(game => {
        if (!user.gameData?.find(activeGame => activeGame.id === game.id)) {
          return true;
        }
      }),
    [user.gameData.length],
  );

  return {
    viewModel: {
      activeGames: user.gameData,
      disabledGames: disabledGameData,
    },
    actions: {
      filterGameList,
    },
  };
};
