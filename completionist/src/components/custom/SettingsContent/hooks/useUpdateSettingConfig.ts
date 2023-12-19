import { SettingsConfigItem } from '@utils/CustomInterfaces';

const useUpdateSettingsConfig = () => {
  const updateConfig = (config: SettingsConfigItem[], item: SettingsConfigItem): SettingsConfigItem[] => {
    const updatedConfig = config.map(configItem => {
      if (configItem.category === item.category) {
        return {
          ...item,
          isActive: !item.isActive
        }
      }
      else {
        return configItem;
      }
    });
    return updatedConfig;
  }

  return { updateConfig };
};

export default useUpdateSettingsConfig;