import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import SteamAchievementsContent from '@components/custom/SteamAchievementsContent/SteamAchievementsContent.native';
import useMainState from '@redux/hooks/useMainState';
import Condition from '@components/general/Condition.native';
import AddSteamIDContent from '@components/custom/SteamAchievementsContent/AddSteamIDContent.native';


const SteamAchievements = () => {
	const { user } = useMainState();

	return (
		<StandardLayout>
			<NavigationHeader title={!user.steamId ? 'Add Steam ID' : 'Steam Achievements'} />
			<Condition 
				condition={!user.steamId}
				conditionalElement={<SteamAchievementsContent />}
			>
				<AddSteamIDContent />
			</Condition>
		</StandardLayout>
	);
};

export default SteamAchievements;