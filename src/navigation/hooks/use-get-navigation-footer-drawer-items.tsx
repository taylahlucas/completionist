import {
  IconTypeEnum,
  AuthScreenEnum,
  DrawerScreenEnum,
  IconType,
} from '@utils/index';
import { useTranslation } from 'react-i18next';

interface NavigationFooterDrawerItem {
  id: AuthScreenEnum | DrawerScreenEnum;
  title: string;
  icon: IconType;
  iconType?: IconTypeEnum;
}

export const useGetNavigationFooterDrawerItems =
  (): NavigationFooterDrawerItem[] => {
    const { t } = useTranslation();

    return [
      {
        id: AuthScreenEnum.GameSelection,
        title: t('common:screens.gameSelection'),
        icon: 'menu-sharp',
        iconType: IconTypeEnum.Ionicons,
      },
      {
        id: DrawerScreenEnum.Achievements,
        title: t('common:screens.achievements'),
        icon: 'wallet-outline',
        iconType: IconTypeEnum.Ionicons,
      },
      {
        id: DrawerScreenEnum.SendRequest,
        title: t('common:screens.sendRequest'),
        icon: 'forward-to-inbox',
      },
      {
        id: DrawerScreenEnum.GameSettings,
        // TODO: Update to Game Settings
        title: t('common:screens.settings'),
        icon: 'settings-outline',
        iconType: IconTypeEnum.Ionicons,
      },
    ];
  };
