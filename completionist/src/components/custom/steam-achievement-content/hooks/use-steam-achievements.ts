import { useMainState } from '@redux/hooks';
import { getSteamPlayerAchievements } from '@data/api/endpoints';

export const useSteamAchievements = () => {
  const { user, selectedGame } = useMainState();

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
