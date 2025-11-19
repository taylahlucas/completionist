import { useGetGameProgressData } from '@data/hooks';
import { useAuthState } from '@redux/auth';
import { GlobalSteamAchievementsState } from '@utils/index';
import { useState } from 'react';

export const useGlobalAchievements = () => {
  const { user } = useAuthState();
  const activeGames = user.gameData;
  const { getGameProgress } = useGetGameProgressData();
  const [progressViewOpen, setProgressViewOpen] = useState<boolean>(true);
  const [steamAchievementsOpen, setSteamAchievementsOpen] =
    useState<string>('');
  const [achievementsState, setAchievementsState] = useState<
    GlobalSteamAchievementsState[]
  >([]);

  // TODO: Global steam achievements
  // const getGlobalSteamAchievements = () => {
  //   activeGames.map((game: GameData) => {
  //     // want to return [{gameid: }]
  //   });
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const currentGameId = currentGame?.appId;
  //     if (!currentGameId) {
  //       // TODO: Log Could not find any game id
  //       console.log('Could not find any game id');
  //       return;
  //     }

  //     if (user.steamId && currentGameId) {
  //       const response = await getSteamPlayerAchievements({
  //         steamId: user.steamId,
  //         gameId: currentGameId.toString(),
  //       });

  //       if (response && !response?.hasPermission) {
  //         setAchievementsState({
  //           ...achievementsState,
  //           hasPermission: false,
  //         });
  //       } else if (response && response?.achievements) {
  //         const items: AchievementItem[] =
  //           response?.noOfLocked > 0
  //             ? [
  //                 ...response?.achievements,
  //                 {
  //                   id: 'locked',
  //                   name: response?.noOfLocked + ' Locked Achievements',
  //                   description: 'Unlock these by playing more of the game',
  //                   unlocked: false,
  //                   icon: '',
  //                 },
  //               ]
  //             : response?.achievements;
  //         setAchievementsState({
  //           ...achievementsState,
  //           hasPermission: true,
  //           items: items,
  //           noOfLocked: response?.achievements.length + response?.noOfLocked,
  //         });
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [selectedGame, user.steamId]);

  return {
    viewModel: {
      steamId: user.steamId,
      activeGames,
      achievementsState,
      progressViewOpen,
      steamAchievementsOpen,
    },
    actions: {
      setAchievementsState,
      setProgressViewOpen,
      setSteamAchievementsOpen,
      getGameProgress,
    },
  };
};
