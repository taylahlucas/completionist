import { useTranslation } from 'react-i18next';
import { ContentSectionEnum, DrawerScreenEnum } from '@utils/CustomEnums';
import { useGetUserGameData, useGetSettingsConfig } from '@data/hooks/index';
import useCheckSectionEnabled from './useCheckSectionEnabled.native';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';
import useContentState from '@components/custom/ContentList/provider/useContentState';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
  const { t } = useTranslation();
  const { userQuests, userCollectables, userLocations, userMiscItems } =
    useGetUserGameData();
  const { gameContent } = useContentState();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();

  // TODO: Need to filter by active here
  // const questData = mapDataTo(questsSection, selectedGame?.id, true);
  const questData = gameContent?.quests ?? [];
  const collectableData = gameContent?.collectables ?? [];
  const locationData = gameContent?.locations ?? [];
  const miscellaneousData = gameContent?.miscellaneous ?? [];
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
  if (collectableData.length > 0) {
    drawerItems.push({
      id: DrawerScreenEnum.Collectables,
      title: t('common:screens.collectables'),
      subTitle: collectablesEnabled
        ? `${userCollectables.length}/${collectableData.length}`
        : '',
      isEnabled: collectablesEnabled,
      isHidden: !shouldHideDisabledSections() && !collectablesEnabled,
    });
  }
  const locationsEnabled = checkIsSectionEnabled(ContentSectionEnum.LOCATIONS);
  if (locationData.length > 0) {
    drawerItems.push({
      id: DrawerScreenEnum.Locations,
      title: t('common:screens.locations'),
      subTitle: locationsEnabled
        ? `${userLocations.length}/${locationData.length}`
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
