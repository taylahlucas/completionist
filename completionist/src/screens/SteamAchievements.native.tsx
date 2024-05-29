import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import AddSteamIDContent from '@components/custom/SteamAchievementsContent/AddSteamIDContent.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';

const SteamAchievements = () => {
	const { t } = useTranslation();
	const { user } = useMainState();

	return (
		<StandardLayout>
			<NavigationHeader
				id={DrawerScreenEnum.SteamAchievements}
				title={!user.steamId
					? t('common:screens.addSteamId')
					: t('common:screens.steamAchievements')}
				leftAction='back'
			/>
			<AddSteamIDContent />
		</StandardLayout>
	);
};

export default SteamAchievements;