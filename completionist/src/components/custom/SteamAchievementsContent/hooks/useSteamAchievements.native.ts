import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import { SteamAchievement, SteamPlayerAchievement } from '@utils/CustomInterfaces';

const useSteamAchievements = () => {
  const { user, selectedGameData } = useMainState();
  const { getSteamAchievementsById, getSteamPlayerAchievements } = useEndpoints();

	const fetchSteamAchievements = async () => {
		if (!!selectedGameData?.appId) {
			const result = await getSteamAchievementsById(selectedGameData?.appId);

			if (!!result) {
				const playerResult = await getSteamPlayerAchievements(selectedGameData?.appId, user.steamId ?? '');
				if (!!playerResult) {
					const updatedResults = result.map((item: SteamAchievement) => {
						const updatedResult = playerResult.find((playerItem: SteamPlayerAchievement) => item.name === playerItem.name);
						return {
							...item,
							achieved: updatedResult?.achieved ?? false,
						};
					});
					return updatedResults;
				}
			}
		}
	};

	return { fetchSteamAchievements };
};

export default useSteamAchievements;
