import { SettingsListItem } from '@utils/CustomInterfaces';

const useGetShowHideOptions = (): SettingsListItem[] => {
  return [
    {
      id: 'completed-items',
      title: 'Completed Items',
      isActive: false
    },
    {
      id: 'disabled-sections',
      title: 'Disabled Sections',
      isActive: false
    },
  ];
};

export default useGetShowHideOptions;