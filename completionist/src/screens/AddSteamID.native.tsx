import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import AddSteamIDContent from '@components/custom/SteamAchievementsContent/AddSteamIDContent.native';

const AddSteamID = () => {
	return (
		<StandardLayout>
			<NavigationHeader title={'Add Steam ID'} leftAction={'back'} />
			<AddSteamIDContent />
		</StandardLayout>
	);
};

export default AddSteamID;