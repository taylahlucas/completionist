import { ScreenEnum } from '@utils/CustomEnums';

interface NavigationFooterDrawerItem {
  id: ScreenEnum;
  title: string;
}

const useGetNavigationFooterDrawerItems = (): NavigationFooterDrawerItem[] => {
  return ([
    {
      id: ScreenEnum.GameSelection,
      title: 'Game Selection'
    },
    {
      id: ScreenEnum.RequestGame,
      title: 'Send Request'
    },
    {
      id: ScreenEnum.Settings,
      title: 'Settings'
    }
  ]);
};

export default useGetNavigationFooterDrawerItems;