import Quests from '@screens/Quests.native';
import Locations from '@screens/Locations.native';
import { ScreenEnum } from '@utils/CustomEnums';

interface TabItemType {
  id: ScreenEnum;
  title: string;
  screen: () => JSX.Element;
}

const useGetTabList = (): TabItemType[] => {
  return [
    {
      id: ScreenEnum.Quests,
      // icon: 'search',
      // iconType: IconTypeEnum.MaterialIcons,
      title: 'Quests',
      screen: Quests
    },
    {
      id: ScreenEnum.Locations,
      // icon: 'format-list-bulleted',
      // iconType: IconTypeEnum.MaterialIcons,
      title: 'Locations',
      screen: Locations
    },
    {
      id: ScreenEnum.Collectables,
      // icon: 'add-circle',
      // iconType: IconTypeEnum.MaterialIcons,
      title: 'Collectables',
      screen: Quests
    },
  ]
};

export default useGetTabList;