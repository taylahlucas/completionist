import { useMainState } from '@redux/hooks';
import { getSteamPlayerAchievements } from '@api/';
import { useAuthUser } from '@redux/auth';

export const useSteamAchievements = () => {
  const { selectedGameData } = useMainState();
  const user = useAuthUser();

  const fetchSteamAchievements = async () => {
    if (selectedGameData?.appId) {
      const results = await getSteamPlayerAchievements({
        steamId: user?.steamId ?? '',
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
