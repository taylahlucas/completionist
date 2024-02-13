import { useEffect } from 'react';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';

const useInitSteamAchievements = () => {
	const { user, selectedGameData } = useMainState();
	const { getSteamAchievementsById } = useEndpoints();

	useEffect(() => {
		if (user.steamId) {
			getSteamAchievementsById(selectedGameData?.appId ?? '');
		}
	}, []);

	return 
};

export default useInitSteamAchievements;