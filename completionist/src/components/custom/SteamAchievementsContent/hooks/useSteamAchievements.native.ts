import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';

const useSteamAchievements = () => {
  const { user, selectedGame } = useMainState();
  const { getSteamPlayerAchievements } = useEndpoints();

  const fetchSteamAchievements = async () => {
    if (!!selectedGame?.appId) {
      const results = await getSteamPlayerAchievements({
        steamId: user.steamId ?? '',
        gameId: selectedGame?.appId.toString(),
      });
      if (!!results) {
        return results;
      }
      return [];
    }
  };

  return { fetchSteamAchievements };
};

export default useSteamAchievements;
