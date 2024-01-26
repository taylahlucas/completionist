import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { SettingsOptionEnum } from '@utils/CustomEnums';
import { SettingsListItem } from '@utils/CustomInterfaces';

const useGetShowHideOptions = (): SettingsListItem[] => {
  const { t } = useTranslation();
  const { user } = useMainState();

  return [
    {
      id: 'completed-items',
      title: t('common:settings.completedItems'),
      isActive: user.settings.find(item => item.id === SettingsOptionEnum.COMPLETED_ITEMS)?.isActive ?? false
    },
    {
      id: 'disabled-sections',
      title: t('common:settings.disabledSections'),
      isActive: user.settings.find(item => item.id === SettingsOptionEnum.DISABLED_SECTIONS)?.isActive ?? false
    },
  ];
};

export default useGetShowHideOptions;