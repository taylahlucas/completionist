import { useMemo } from 'react';
import { useMainState } from '@redux/hooks';
import useGetTheme from '@styles/hooks/use-get-theme';
import { allGameData } from '@utils/configs/game-configs';

export const useGameListItem = () => {
  const theme = useGetTheme();
  const { user } = useMainState();

  const disabledGameData = useMemo(
    () =>
      allGameData.filter(game => {
        if (!user.gameData?.find(activeGame => activeGame.id === game.id)) {
          return true;
        }
      }),
    [user.gameData],
  );

  return {
    viewModel: {
      activeGames: user.gameData,
      disabledGames: disabledGameData,
      theme,
    },
  };
};
