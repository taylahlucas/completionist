import { useTranslation } from 'react-i18next';
import { useGetSettingsConfig } from '@data/hooks';
import { useCheckSectionEnabled } from './';
import {
  NavigationDrawerItemData,
  ContentSectionEnum,
  DrawerScreenEnum,
} from '@utils/index';
import { useContentState } from '@features/game-content/provider';
import {
  filterActiveSections,
  getAllCompletedGameDataForSection,
} from '@data/index';
import { useMainState } from '@redux/hooks';

export const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
  const { t } = useTranslation();
  const { selectedGameData } = useMainState();
  const { userQuests, userCollectables, userLocations, userMiscellaneous } =
    getAllCompletedGameDataForSection(selectedGameData);
  const { gameContent } = useContentState();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();

  const questData = filterActiveSections(
    selectedGameData?.settingsConfig.general ?? [],
    gameContent?.quests ?? [],
  );
  const collectablesData = filterActiveSections(
    selectedGameData?.settingsConfig.general ?? [],
    gameContent?.collectables ?? [],
  );
  const locationsData = filterActiveSections(
    selectedGameData?.settingsConfig.general ?? [],
    gameContent?.locations ?? [],
  );
  const miscellaneousData = filterActiveSections(
    selectedGameData?.settingsConfig.general ?? [],
    gameContent?.miscellaneous ?? [],
  );
  const { shouldHideDisabledSections } = useGetSettingsConfig();

  const drawerItems = [];
  const questsEnabled = checkIsSectionEnabled(ContentSectionEnum.QUESTS);
  if (questData.length > 0) {
    drawerItems.push({
      id: DrawerScreenEnum.Quests,
      title: t('common:screens.quests'),
      subTitle: questsEnabled ? `${userQuests.length}/${questData.length}` : '',
      isEnabled: questsEnabled,
      isHidden: !shouldHideDisabledSections() && !questsEnabled,
    });
  }
  const collectablesEnabled = checkIsSectionEnabled(
    ContentSectionEnum.COLLECTABLES,
  );
  if (collectablesData.length > 0) {
    drawerItems.push({
      id: DrawerScreenEnum.Collectables,
      title: t('common:screens.collectables'),
      subTitle: collectablesEnabled
        ? `${userCollectables.length}/${collectablesData.length}`
        : '',
      isEnabled: collectablesEnabled,
      isHidden: !shouldHideDisabledSections() && !collectablesEnabled,
    });
  }
  const locationsEnabled = checkIsSectionEnabled(ContentSectionEnum.LOCATIONS);
  if (locationsData.length > 0) {
    drawerItems.push({
      id: DrawerScreenEnum.Locations,
      title: t('common:screens.locations'),
      subTitle: locationsEnabled
        ? `${userLocations.length}/${locationsData.length}`
        : '',
      isEnabled: locationsEnabled,
      isHidden: !shouldHideDisabledSections() && !locationsEnabled,
    });
  }
  const miscItemsEnabled = checkIsSectionEnabled(
    ContentSectionEnum.MISCELLANEOUS,
  );
  if (miscellaneousData.length > 0) {
    drawerItems.push({
      id: DrawerScreenEnum.Miscellaneous,
      title: t('common:screens.miscellaneous'),
      subTitle: miscItemsEnabled
        ? `${userMiscellaneous.length}/${miscellaneousData.length}`
        : '',
      isEnabled: miscItemsEnabled,
      isHidden: !shouldHideDisabledSections() && !miscItemsEnabled,
    });
  }

  return drawerItems;
};
