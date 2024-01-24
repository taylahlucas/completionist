import { ScreenEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useCheckSectionEnabled from './useCheckSectionEnabled.native';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
  const { selectedGame } = useMainState();
  const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData();
  const { mapDataTo } = useGetGameData();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();
  const questsSection = 'Quests';
  const collectablesSection = 'Collectables';
  const locationsSection = 'Locations';
  const miscItemsSection = 'Miscellaneous';

  return ([
    {
      id: ScreenEnum.Quests,
      title: questsSection,
      subTitle: checkIsSectionEnabled(questsSection) ? `${getUserQuests().length}/${mapDataTo(questsSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(questsSection)
    },
    {
      id: ScreenEnum.Collectables,
      title: collectablesSection,
      subTitle: checkIsSectionEnabled(collectablesSection) ? `${getUserCollectables().length}/${mapDataTo(collectablesSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(collectablesSection)
    },
    {
      id: ScreenEnum.Locations,
      title: locationsSection,
      subTitle:  checkIsSectionEnabled(locationsSection) ? `${getUserLocations().length}/${mapDataTo(locationsSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(locationsSection)
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: miscItemsSection,
      subTitle: checkIsSectionEnabled(miscItemsSection) ? `${getUserMiscItems().length}/${mapDataTo(miscItemsSection, selectedGame, true).length}` : '',
      isEnabled: checkIsSectionEnabled(miscItemsSection)
    },
  ]);
};

export default useGetNavigationDrawerItems;