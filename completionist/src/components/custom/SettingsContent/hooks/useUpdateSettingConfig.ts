import { SettingsConfigItem } from '@utils/CustomInterfaces';

const useUpdateSettingsConfig = () => {
  const updateConfig = (config: SettingsConfigItem[], item: SettingsConfigItem): SettingsConfigItem[] => {
    if (item.category === "") {
      return config.map(configItem => {
        if (configItem.section === item.section) {
          return {
            section: configItem.section,
            category: configItem.category,
            isActive: !item.isActive
          }
        }
        else {
          return configItem
        }
      })
    }
    else {
      return config.map(configItem => {
        return (configItem.section === item.section && configItem.category === item.category)
        ? {
          ...item,
          isActive: !item.isActive
        }
        : configItem;
      });
    }
  }

  return { updateConfig };
};

export default useUpdateSettingsConfig;