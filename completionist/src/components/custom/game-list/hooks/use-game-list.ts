import { useMemo } from 'react';
import { useMainState } from '@redux/hooks';
import { filterGameList } from './use-filter-game-list';
import { allGameData } from '@utils/configs/game-configs';

export const useGameList = () => {
  const { user } = useMainState();

  const disabledGameData = useMemo(() => {
    const activeGames = Object.values(user.gameData ?? {});

    return allGameData.filter(game => {
      return !activeGames.find(activeGame => activeGame.id === game.id);
    });
  }, [user.gameData, allGameData]);

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
