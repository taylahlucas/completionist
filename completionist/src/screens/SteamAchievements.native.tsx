import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import AddSteamIDContent from '@components/custom/SteamAchievementsContent/AddSteamIDContent.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';

const SteamAchievements = () => {
	const { t } = useTranslation();
	const { user } = useMainState();
	const navigation = useReactNavigation();

	useEffect(() => {
		console.log("user: ", user.steamId)
		if (!!user.steamId) {
			navigation.goBack();
		}
	}, [user.steamId])

	return (
		<StandardLayout>
			<NavigationHeader
				id={DrawerScreenEnum.SteamAchievements}
				title={!user.steamId
					? t('common:screens.addSteamId')
					: t('common:screens.steamAchievements')}
				leftAction='back'
			/>
			{/* <Condition
				condition={!user.steamId}
				conditionalElement={<SteamAchievementsContent />}
			> */}
				<AddSteamIDContent />
			{/* </Condition> */}
		</StandardLayout>
	);
};

export default SteamAchievements;