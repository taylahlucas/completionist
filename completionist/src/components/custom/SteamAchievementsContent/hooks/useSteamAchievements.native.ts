import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';

const useSteamAchievements = () => {
  const { user, selectedGameData } = useMainState();
  const { getSteamPlayerAchievements } = useEndpoints();

	const fetchSteamAchievements = async () => {
		if (!!selectedGameData?.appId) {
			const results = await getSteamPlayerAchievements({ userId: user.userId, steamId: user.steamId ?? '', gameId: selectedGameData?.appId })
			if (!!results) {
				return results;
			}
			return [];
		}
	};

	return { fetchSteamAchievements };
};

export default useSteamAchievements;
