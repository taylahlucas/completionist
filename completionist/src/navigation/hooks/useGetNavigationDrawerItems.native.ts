import { ScreenEnum } from '@utils/CustomEnums';
import misc from '../../../backend/database/skyrim_misc.json';
import locations from '../../../backend/database/skyrim_locations.json';
import useMainState from '@redux/hooks/useMainState';
import useGetGameData from '@data/hooks/useGetGameData.native';

interface NavigationDrawerItem {
  id: ScreenEnum;
  title: string;
  subTitle: string;
}

const useGetNavigationDrawerItems = (): NavigationDrawerItem[] => {
  const { user, selectedGame } = useMainState();
  const { mapDataToQuests, mapDataToCollectables } = useGetGameData();
  
  return ([
    {
      id: ScreenEnum.Quests,
      title: 'Quests',
      subTitle: `${user.data?.skyrim?.quests.length ?? 0}/${mapDataToQuests(selectedGame).length}`
    },
    {
      id: ScreenEnum.Collectables,
      title: 'Collectables',
      subTitle: `${user.data?.skyrim?.collectables.length ?? 0}/${mapDataToCollectables(selectedGame).length}`
    },
    {
      id: ScreenEnum.Locations,
      title: 'Locations',
      subTitle: `${user.data?.skyrim?.locations.length ?? 0}/${locations.length}`
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: 'Miscellaneous',
      subTitle: `${user.data?.skyrim?.miscellaneous.length ?? 0}/${misc.length}`
    },
  ]);
};

export default useGetNavigationDrawerItems;