import { ScreenEnum } from '@utils/CustomEnums';
import { useTranslation } from 'react-i18next';

interface NavigationFooterDrawerItem {
  id: ScreenEnum;
  title: string;
}

const useGetNavigationFooterDrawerItems = (): NavigationFooterDrawerItem[] => {
  const { t } = useTranslation();

  return ([
    {
      id: ScreenEnum.GameSelection,
      title: t('common:screens.gameSelection')
    },
    {
      id: ScreenEnum.RequestGame,
      title: t('common:screens.sendRequest')
    },
    {
      id: ScreenEnum.Settings,
      title: t('common:screens.settings')
    }
  ]);
};

export default useGetNavigationFooterDrawerItems;