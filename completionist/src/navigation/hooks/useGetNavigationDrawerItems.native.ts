import { ScreenEnum } from '@utils/CustomEnums';
import misc from '../../../backend/database/skyrim/skyrim_misc.json';
import locations from '../../../backend/database/skyrim/skyrim_locations.json';
import useGetGameData from '@data/hooks/useGetGameData.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';

interface NavigationDrawerItem {
  id: ScreenEnum;
  title: string;
  subTitle: string;
}

const useGetNavigationDrawerItems = (): NavigationDrawerItem[] => {
  const { getUserQuests, getUserCollectables, getUserLocations, getUserMiscItems } = useGetUserGameData();
  const { mapDataToQuests, mapDataToCollectables } = useGetGameData();

  return ([
    {
      id: ScreenEnum.Quests,
      title: 'Quests',
      subTitle: `${getUserQuests().length}/${mapDataToQuests().length}`
    },
    {
      id: ScreenEnum.Collectables,
      title: 'Collectables',
      subTitle: `${getUserCollectables().length}/${mapDataToCollectables().length}`
    },
    {
      id: ScreenEnum.Locations,
      title: 'Locations',
      subTitle: `${getUserLocations().length}/${locations.length}`
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: 'Miscellaneous',
      subTitle: `${getUserMiscItems().length}/${misc.length}`
    },
  ]);
};

export default useGetNavigationDrawerItems;