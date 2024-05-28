import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import { SteamAchievement, AchievementItem } from '@utils/CustomInterfaces';

const useSteamAchievements = () => {
  const { user, selectedGameData } = useMainState();
  const { getSteamPlayerAchievements } = useEndpoints();

	const fetchSteamAchievements = async () => {
		if (!!selectedGameData?.appId) {
			const results = await getSteamPlayerAchievements({ steamId: user.steamId ?? '', gameId: selectedGameData?.appId })
			if (!!results) {
				return results;
			}
			return [];
		}
	};

	return { fetchSteamAchievements };
};

export default useSteamAchievements;
