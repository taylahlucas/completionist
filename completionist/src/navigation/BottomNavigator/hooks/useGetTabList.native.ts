import Home from '@screens/Home.native';
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
      screen: Home
    },
    {
      id: ScreenEnum.Locations,
      // icon: 'format-list-bulleted',
      // iconType: IconTypeEnum.MaterialIcons,
      title: 'Locations',
      screen: Home
    },
    {
      id: ScreenEnum.Collectables,
      // icon: 'add-circle',
      // iconType: IconTypeEnum.MaterialIcons,
      title: 'Collectables',
      screen: Home
    },
  ]
};

export default useGetTabList;