import { ScreenEnum } from '@utils/CustomEnums';
import misc from '../../../backend/database/skyrim_misc.json';
import locations from '../../../backend/database/skyrim_locations.json';
import { mappedQuests, mappedCollectables } from '@data/functions';
import useMainState from '@redux/hooks/useMainState';

interface NavigationDrawerItem {
  id: ScreenEnum;
  title: string;
  subTitle: string;
}

const useGetNavigationDrawerItems = (): NavigationDrawerItem[] => {
  const { user } = useMainState();
  
  return ([
    {
      id: ScreenEnum.Quests,
      title: 'Quests',
      subTitle: `${user.data.skyrim?.quests.length}/${mappedQuests.length}`
    },
    {
      id: ScreenEnum.Collectables,
      title: 'Collectables',
      subTitle: `${user.data.skyrim?.collectables.length}/${mappedCollectables.length}`
    },
    {
      id: ScreenEnum.Locations,
      title: 'Locations',
      subTitle: `${user.data.skyrim?.locations.length}/${locations.length}`
    },
    {
      id: ScreenEnum.Miscellaneous,
      title: 'Miscellaneous',
      subTitle: `${user.data.skyrim?.miscellaneous.length}/${misc.length}`
    },
  ]);
};

export default useGetNavigationDrawerItems;