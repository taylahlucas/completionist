import { useEffect } from 'react';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useMainState from '@redux/hooks/useMainState';

const useInitSteamAchievements = () => {
	const { user } = useMainState();
	const navigation = useReactNavigation();
	const { getSteamUserById, getSteamAchievementsById } = useEndpoints();

	useEffect(() => {
		if (!user.steamId) {
			navigation.navigate(ScreenEnum.AddSteamID);
		}
	}, []);

	return 
};

export default useInitSteamAchievements;