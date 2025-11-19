import { useTranslation } from 'react-i18next';
import { SettingsOptionEnum } from '@utils/index';
import { useAuthUser } from '@redux/auth';

interface SettingsOptionsItem {
  id: string;
  title: string;
  isActive: boolean;
}

export const useGetShowHideOptions = (): SettingsOptionsItem[] => {
  const { t } = useTranslation();
  const user = useAuthUser();

  return [
    {
      id: 'disabled-sections',
      title: t('common:settings.disabledSections'),
      isActive:
        user.settings.configs.find(
          item => item.id === SettingsOptionEnum.DISABLED_SECTIONS,
        )?.isActive ?? false,
    },
  ];
};
