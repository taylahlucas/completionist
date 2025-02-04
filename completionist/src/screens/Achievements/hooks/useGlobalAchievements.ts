import { useGetGameProgressData } from '@data/hooks';
import useMainState from '@redux/hooks/useMainState';

const useGlobalAchievements = () => {
  const { user } = useMainState();
  const activeGames = user.gameData;
  const { getGameProgress } = useGetGameProgressData();
  // const getGlobalSteamAchievements = () => {
  //   activeGames.map((game: GameData) => {
  //     // want to return [{gameid: }]
  //   });
  // };

  return {
    viewModel: {},
    actions: {},
  };
};

export default useGlobalAchievements;
