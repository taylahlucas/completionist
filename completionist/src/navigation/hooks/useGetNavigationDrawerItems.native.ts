import { ScreenEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useCheckSectionEnabled from './useCheckSectionEnabled.native';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';

const useGetNavigationDrawerItems = (): NavigationDrawerItemData[] => {
  const { selectedGame } = useMainState();
  const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData();
  const {
    mapDataToFilteredQuests, 
    mapDataToFilteredCollectables, 
    mapDataToFilteredLocations, 
    mapDataToFilteredMiscItems 
  } = useGetGameData();
  const { checkIsSectionEnabled } = useCheckSectionEnabled();

  return ([
    {
      id: ScreenEnum.Quests,
      title: 'Quests',
      subTitle: checkIsSectionEnabled('Quests') ? `${getUserQuests().length}/${mapDataToFilteredQuests(selectedGame).length}` : '',
      isEnabled: checkIsSectionEnabled('Quests')
    },
    {
      id: ScreenEnum.Collectables,
      title: 'Collectables',
      subTitle: checkIsSectionEnabled('Collectables') ? `${getUserCollectables().length}/${mapDataToFilteredCollectables(selectedGame).length}` : '',
      isEnabled: checkIsSectionEnabled('Collectables')
    },
    {
      id: ScreenEnum.Locations,
      title: 'Locations',
      subTitle:  checkIsSectionEnabled('Locations') ? `${getUserLocations().length}/${mapDataToFilteredLocations(selectedGame).length}` : '',
      isEnabled: checkIsSectionEnabled('Locations')
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: 'Miscellaneous',
      subTitle: checkIsSectionEnabled('Miscellaneous') ? `${getUserMiscItems().length}/${mapDataToFilteredMiscItems(selectedGame).length}` : '',
      isEnabled: checkIsSectionEnabled('Miscellaneous')
    },
  ]);
};

export default useGetNavigationDrawerItems;