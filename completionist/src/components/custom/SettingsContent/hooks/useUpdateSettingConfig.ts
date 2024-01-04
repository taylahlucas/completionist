import { SettingsConfigItem } from '@utils/CustomInterfaces';

const useUpdateSettingsConfig = () => {
  const updateConfig = (config: SettingsConfigItem[], item: SettingsConfigItem): SettingsConfigItem[] => {
    if (item.category === "") {
      // Main Category
      return config.map(configItem => {
        if (configItem.section === item.section) {
          return {
            section: configItem.section,
            category: configItem.category,
            isActive: item.isActive === false
          }
        }
        else {
          return configItem
        }
      })
    }
    else {
      return config.map(configItem => {
        // Sub Category
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