import useMainState from '@redux/hooks/useMainState';
import { SettingsOptionEnum } from '@utils/CustomEnums';
import { SettingsListItem } from '@utils/CustomInterfaces';

const useGetShowHideOptions = (): SettingsListItem[] => {
  const { user } = useMainState();

  return [
    {
      id: 'completed-items',
      title: 'Completed Items',
      isActive: user.settings.find(item => item.id === SettingsOptionEnum.COMPLETED_ITEMS)?.isActive ?? false
    },
    {
      id: 'disabled-sections',
      title: 'Disabled Sections',
      isActive: user.settings.find(item => item.id === SettingsOptionEnum.DISABLED_SECTIONS)?.isActive ?? false
    },
  ];
};

export default useGetShowHideOptions;