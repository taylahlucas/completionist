import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import SteamAchievementsContent from '@components/custom/SteamAchievementsContent/SteamAchievementsContent.native';
import useMainState from '@redux/hooks/useMainState';
import useInitSteamAchievements from '@components/custom/SteamAchievementsContent/hooks/useInitSteamAchievements.native';


const SteamAchievements = () => {
	const { selectedGame } = useMainState();

	// TODO: Need to check if steam integrated and !!user.steamId
	useInitSteamAchievements();

	return (
		<StandardLayout>
			<NavigationHeader title={'Steam Achievements'} />
			<SteamAchievementsContent />
		</StandardLayout>
	);
};

export default SteamAchievements;