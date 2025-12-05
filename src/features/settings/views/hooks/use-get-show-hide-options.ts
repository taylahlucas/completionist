import { useTranslation } from 'react-i18next';
import { useAuthUser } from '@redux/auth';
import { SettingsOptionsKey } from '@api/';

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
          (item: SettingsOptionsItem) =>
            item.id === SettingsOptionsKey.disabledSections,
        )?.isActive ?? false,
    },
  ];
};
