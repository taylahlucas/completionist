import { useTranslation } from 'react-i18next';
import { ContentSectionEnum, DrawerScreenEnum } from '@utils/CustomEnums';
import { useGetUserGameData, useGetSettingsConfig } from '@data/hooks';
import { useCheckSectionEnabled } from './';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';
import { useContentState } from '@components/custom/content-list/provider';
import { filterActiveSections } from '@data/helpers/filter-active-sessions';
import { useMainState } from '@redux/hooks';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
  const { t } = useTranslation();
  const { userQuests, userCollectables, userLocations, userMiscItems } =
    useGetUserGameData();
  const { selectedGame } = useMainState();
  const { gameContent } = useContentState();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();

  const questData = filterActiveSections(
    selectedGame?.settingsConfig.general ?? [],
    gameContent?.quests ?? [],
  );
  const collectablesData = filterActiveSections(
    selectedGame?.settingsConfig.general ?? [],
    gameContent?.collectables ?? [],
  );
  const locationsData = filterActiveSections(
    selectedGame?.settingsConfig.general ?? [],
    gameContent?.locations ?? [],
  );
  const miscellaneousData = filterActiveSections(
    selectedGame?.settingsConfig.general ?? [],
    gameContent?.miscellaneous ?? [],
  );
  const { shouldHideDisabledSections } = useGetSettingsConfig();

  let drawerItems = [];
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
        ? `${userMiscItems.length}/${miscellaneousData.length}`
        : '',
      isEnabled: miscItemsEnabled,
      isHidden: !shouldHideDisabledSections() && !miscItemsEnabled,
    });
  }

  return drawerItems;
};

export default useGetNavigationDrawerItems;
