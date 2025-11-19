import { useMainState } from '@redux/hooks';
import { getSteamPlayerAchievements } from '@data/index';
import { useAuthState } from '@redux/auth';

export const useSteamAchievements = () => {
  const { selectedGameData } = useMainState();
  const { user } = useAuthState();

  const fetchSteamAchievements = async () => {
    if (selectedGameData?.appId) {
      const results = await getSteamPlayerAchievements({
        steamId: user.steamId ?? '',
        gameId: selectedGameData?.appId.toString(),
      });
      if (results) {
        return results;
      }
      return [];
    }
  };

  return { fetchSteamAchievements };
};
