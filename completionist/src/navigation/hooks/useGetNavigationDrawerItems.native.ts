import { useTranslation } from 'react-i18next';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useCheckSectionEnabled from './useCheckSectionEnabled.native';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
	const { t } = useTranslation();
	const { selectedGame, selectedGameData, user } = useMainState();
	const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData(selectedGameData);
	const { getAllData } = useGetGameData();
	const { checkIsSectionEnabled } = useCheckSectionEnabled();
	const {
		quests,
		collectables,
		locations,
		miscellaneous
	} = getAllData(selectedGame);
	const { shouldHideDisabledSections } = useGetSettingsConfig();
	
	let drawerItems = [];
	const questsEnabled = checkIsSectionEnabled(quests.section);
	if (quests.data.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Quests,
			title: t('common:screens.quests'),
			subTitle: questsEnabled ? `${getUserQuests().length}/${quests.data.length}` : '',
			isEnabled: questsEnabled,
			isHidden: shouldHideDisabledSections() && !questsEnabled
		},)
	}
	const collectablesEnabled = checkIsSectionEnabled(collectables.section);
	if (collectables.data.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Collectables,
			title: t('common:screens.collectables'),
			subTitle: collectablesEnabled ? `${getUserCollectables().length}/${collectables.data.length}` : '',
			isEnabled: collectablesEnabled,
			isHidden: shouldHideDisabledSections() && !collectablesEnabled
		})
	}
	const locationsEnabled = checkIsSectionEnabled(locations.section);
	if (locations.data.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Locations,
			title: t('common:screens.locations'),
			subTitle: locationsEnabled ? `${getUserLocations().length}/${locations.data.length}` : '',
			isEnabled: locationsEnabled,
			isHidden: shouldHideDisabledSections() && !locationsEnabled
		})
	}
	const miscItemsEnabled = checkIsSectionEnabled(miscellaneous.section);
	if (miscellaneous.data.length > 0) {
		drawerItems.push({
			id: DrawerScreenEnum.Miscellaneous,
			title: t('common:screens.miscellaneous'),
			subTitle: miscItemsEnabled ? `${getUserMiscItems().length}/${miscellaneous.data.length}` : '',
			isEnabled: miscItemsEnabled,
			isHidden: shouldHideDisabledSections() && !miscItemsEnabled
		})
	}
	
	return drawerItems;
};

export default useGetNavigationDrawerItems;