import { useTranslation } from 'react-i18next';
import { AuthScreenEnum, ContentSectionEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useCheckSectionEnabled from './useCheckSectionEnabled.native';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
	const { t } = useTranslation();
	const { selectedGame } = useMainState();
	const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData();
	const { mapDataTo } = useGetGameData();
	const { checkIsSectionEnabled } = useCheckSectionEnabled();
	const questsSection = ContentSectionEnum.QUESTS;
	const collectablesSection = ContentSectionEnum.COLLECTABLES;
	const locationsSection = ContentSectionEnum.LOCATIONS;
	const miscItemsSection = ContentSectionEnum.MISCELLANEOUS;
	const questData = mapDataTo(questsSection, selectedGame, true);
	const collectableData = mapDataTo(collectablesSection, selectedGame, true);
	const locationData = mapDataTo(locationsSection, selectedGame, true);
	const miscellaneousData = mapDataTo(miscItemsSection, selectedGame, true);

	let drawerItems = [];
	if (questData.length > 0) {
		drawerItems.push({
			id: AuthScreenEnum.Quests,
			title: t('common:screens.quests'),
			subTitle: checkIsSectionEnabled(questsSection) ? `${getUserQuests().length}/${questData.length}` : '',
			isEnabled: checkIsSectionEnabled(questsSection)
		},)
	}
	if (collectableData.length > 0) {
		drawerItems.push({
			id: AuthScreenEnum.Collectables,
			title: t('common:screens.collectables'),
			subTitle: checkIsSectionEnabled(collectablesSection) ? `${getUserCollectables().length}/${collectableData.length}` : '',
			isEnabled: checkIsSectionEnabled(collectablesSection)
		})
	}
	if (locationData.length > 0) {
		drawerItems.push({
			id: AuthScreenEnum.Locations,
			title: t('common:screens.locations'),
			subTitle: checkIsSectionEnabled(locationsSection) ? `${getUserLocations().length}/${locationData.length}` : '',
			isEnabled: checkIsSectionEnabled(locationsSection)
		})
	}
	if (miscellaneousData.length > 0) {
		drawerItems.push({
			id: AuthScreenEnum.Miscellaneous,
			title: t('common:screens.miscellaneous'),
			subTitle: checkIsSectionEnabled(miscItemsSection) ? `${getUserMiscItems().length}/${miscellaneousData.length}` : '',
			isEnabled: checkIsSectionEnabled(miscItemsSection)
		})
	}
	
	return drawerItems;
};

export default useGetNavigationDrawerItems;