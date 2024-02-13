import { useTranslation } from 'react-i18next';
import { ScreenEnum, ContentSectionEnum } from '@utils/CustomEnums';
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

  return ([
    {
      id: ScreenEnum.Quests,
      title: t('common:screens.quests'),
      subTitle: checkIsSectionEnabled(questsSection) ? `${getUserQuests().length}/${mapDataTo(questsSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(questsSection)
    },
    {
      id: ScreenEnum.Collectables,
      title: t('common:screens.collectables'),
      subTitle: checkIsSectionEnabled(collectablesSection) ? `${getUserCollectables().length}/${mapDataTo(collectablesSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(collectablesSection)
    },
    {
      id: ScreenEnum.Locations,
      title: t('common:screens.locations'),
      subTitle:  checkIsSectionEnabled(locationsSection) ? `${getUserLocations().length}/${mapDataTo(locationsSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(locationsSection)
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: t('common:screens.miscellaneous'),
      subTitle: checkIsSectionEnabled(miscItemsSection) ? `${getUserMiscItems().length}/${mapDataTo(miscItemsSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(miscItemsSection)
    }
  ]);
};

export default useGetNavigationDrawerItems;