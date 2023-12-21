import { ScreenEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import useMainState from '@redux/hooks/useMainState';

interface NavigationDrawerItem {
  id: ScreenEnum;
  title: string;
  subTitle: string;
}

const useGetNavigationDrawerItems = (): NavigationDrawerItem[] => {
  const { selectedGame } = useMainState();
  const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData();
  const { mapDataToQuests, mapDataToCollectables, mapDataToLocations, mapDataToMiscItems } = useGetGameData();

  return ([
    {
      id: ScreenEnum.Quests,
      title: 'Quests',
      subTitle: `${getUserQuests().length}/${mapDataToQuests(selectedGame).length}`
    },
    {
      id: ScreenEnum.Collectables,
      title: 'Collectables',
      subTitle: `${getUserCollectables().length}/${mapDataToCollectables(selectedGame).length}`
    },
    {
      id: ScreenEnum.Locations,
      title: 'Locations',
      subTitle: `${getUserLocations().length}/${mapDataToLocations(selectedGame).length}`
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: 'Miscellaneous',
      subTitle: `${getUserMiscItems().length}/${mapDataToMiscItems(selectedGame).length}`
    },
  ]);
};

export default useGetNavigationDrawerItems;