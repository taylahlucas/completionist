import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/use-main-state';
import { SettingsOptionEnum } from '@utils/CustomEnums';

interface SettingsOptionsItem {
  id: string;
  title: string;
  isActive: boolean;
}

export const useGetShowHideOptions = (): SettingsOptionsItem[] => {
  const { t } = useTranslation();
  const { user } = useMainState();

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
