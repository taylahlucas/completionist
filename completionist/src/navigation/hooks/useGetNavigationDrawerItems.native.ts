import { ScreenEnum } from '@utils/CustomEnums';
import books from '../../../backend/database/skyrim_books.json';
import locations from '../../../backend/database/skyrim_locations.json';
import { mappedQuests, mappedCollectables } from '@data/functions';
import useMainState from '@redux/hooks/useMainState';

interface NavigationDrawerItem {
  id: ScreenEnum;
  title: string;
  subTitle: string;
}

const useGetNavigationDrawerItems = (): NavigationDrawerItem[] => {
  const { completedQuestIds, completedCollectableIds, completedBookIds, completedLocationIds } = useMainState();
  
  return ([
    {
      id: ScreenEnum.Quests,
      title: 'Quests',
      subTitle: `${completedQuestIds.length}/${mappedQuests.length}`
    },
    {
      id: ScreenEnum.Collectables,
      title: 'Collectables',
      subTitle: `${completedCollectableIds.length}/${mappedCollectables.length}`
    },
    {
      id: ScreenEnum.Books,
      title: 'Books',
      subTitle: `${completedBookIds.length}/${books.length}`
    },
    {
      id: ScreenEnum.Locations,
      title: 'Locations',
      subTitle: `${completedLocationIds.length}/${locations.length}`
    }
  ]);
};

export default useGetNavigationDrawerItems;