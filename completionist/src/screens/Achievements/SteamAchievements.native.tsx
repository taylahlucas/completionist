import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import AddSteamIDContent from '@components/custom/SteamAchievementsContent/AddSteamIDContent.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import useAchievements from './hooks/useAchievements';

const SteamAchievements = () => {
	const { viewModel } = useAchievements();

	return (
		<StandardLayout>
			<NavigationHeader
				id={DrawerScreenEnum.SteamAchievements}
				title={viewModel.steamAchievements.title}
				leftAction='back'
			/>
			<AddSteamIDContent />
		</StandardLayout>
	);
};

export default SteamAchievements;