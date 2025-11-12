import { useMainState } from '@redux/hooks';
import { getSteamPlayerAchievements } from '@data/index';

export const useSteamAchievements = () => {
  const { user, selectedGameData } = useMainState();

  const fetchSteamAchievements = async () => {
    if (!!selectedGameData?.appId) {
      const results = await getSteamPlayerAchievements({
        steamId: user.steamId ?? '',
        gameId: selectedGameData?.appId.toString(),
      });
      if (!!results) {
        return results;
      }
      return [];
    }
  };

  return { fetchSteamAchievements };
};
