import { useGetGameProgressData } from '@data/hooks';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { AchievementsState } from '@utils/CustomInterfaces';
import { useState } from 'react';

const useGlobalAchievements = () => {
  const { user } = useMainState();
  const activeGames = user.gameData;
  const { getGameProgress } = useGetGameProgressData();
  const [progressViewOpen, setProgressViewOpen] = useState<boolean>(true);
  const [currentAchievementOpen, setCurrentAchievementOpen] =
    useState<string>('');
  const [achievementsState, setAchievementsState] = useState<AchievementsState>(
    {
      isOpen: true,
      hasPermission: !!user.steamId,
      items: [],
      noOfLocked: 0,
    },
  );

  // TODO: Global steam achievements
  // const getGlobalSteamAchievements = () => {
  //   activeGames.map((game: GameData) => {
  //     // want to return [{gameid: }]
  //   });
  // };

  return {
    viewModel: {
      steamId: user.steamId,
      activeGames,
      achievementsState,
      progressViewOpen,
      currentAchievementOpen,
    },
    actions: {
      setAchievementsState,
      setProgressViewOpen,
      setCurrentAchievementOpen,
      getGameProgress,
    },
  };
};

export default useGlobalAchievements;
