import { useTranslation } from 'react-i18next';
import { DrawerScreenEnum, ContentSectionEnum } from '@utils/CustomEnums';
import {useGetGameData, useGetUserGameData, useGetSettingsConfig} from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';
import useCheckSectionEnabled from './useCheckSectionEnabled.native';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
	const { t } = useTranslation();
	const { selectedGame } = useMainState();
	const { userQuests, userCollectables, userLocations, userMiscItems } = useGetUserGameData();
	const { mapDataTo } = useGetGameData();
	const { checkIsSectionEnabled } = useCheckSectionEnabled();
	const questsSection = ContentSectionEnum.QUESTS;
	const collectablesSection = ContentSectionEnum.COLLECTABLES;
	const locationsSection = ContentSectionEnum.LOCATIONS;
	const miscItemsSection = ContentSectionEnum.MISCELLANEOUS;
	const questData = mapDataTo(questsSection, selectedGame?.id, true);
	const collectableData = mapDataTo(collectablesSection, selectedGame?.id, true);
	const locationData = mapDataTo(locationsSection, selectedGame?.id, true);
	const miscellaneousData = mapDataTo(miscItemsSection, selectedGame?.id, true);
	const { shouldHideDisabledSections } = useGetSettingsConfig();
	
	let drawerItems = [];
	const questsEnabled = checkIsSectionEnabled(questsSection);
	if (questData.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Quests,
			title: t('common:screens.quests'),
			subTitle: questsEnabled ? `${userQuests.length}/${questData.length}` : '',
			isEnabled: questsEnabled,
			isHidden: shouldHideDisabledSections() && !questsEnabled
		},)
	}
	const collectablesEnabled = checkIsSectionEnabled(collectablesSection);
	if (collectableData.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Collectables,
			title: t('common:screens.collectables'),
			subTitle: collectablesEnabled ? `${userCollectables.length}/${collectableData.length}` : '',
			isEnabled: collectablesEnabled,
			isHidden: shouldHideDisabledSections() && !collectablesEnabled
		})
	}
	const locationsEnabled = checkIsSectionEnabled(locationsSection);
	if (locationData.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Locations,
			title: t('common:screens.locations'),
			subTitle: locationsEnabled ? `${userLocations.length}/${locationData.length}` : '',
			isEnabled: locationsEnabled,
			isHidden: shouldHideDisabledSections() && !locationsEnabled
		})
	}
	const miscItemsEnabled = checkIsSectionEnabled(miscItemsSection);
	if (miscellaneousData.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Miscellaneous,
			title: t('common:screens.miscellaneous'),
			subTitle: miscItemsEnabled ? `${userMiscItems.length}/${miscellaneousData.length}` : '',
			isEnabled: miscItemsEnabled,
			isHidden: shouldHideDisabledSections() && !miscItemsEnabled
		})
	}
	
	return drawerItems;
};

export default useGetNavigationDrawerItems;