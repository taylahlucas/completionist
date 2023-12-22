import { SettingsConfigItem } from '@utils/CustomInterfaces';

const useUpdateSettingsConfig = () => {
  const updateConfig = (config: SettingsConfigItem[], item: SettingsConfigItem): SettingsConfigItem[] => {
    if (item.category === "") {
      return config.map(configItem => {
        if (configItem.section === item.section) {
          return {
            section: configItem.section,
            category: configItem.category,
            isActive: !configItem.isActive
          }
        }
        else {
          return configItem
        }
      })
    }
    else {
      // TODO: Fix bug where section is active, disabled some sub sections, then enable section again
      return config.map(configItem => {
        if (item.section === configItem.section && configItem.category === "") {
          return {
            ...configItem,
            isActive: true
          }
        }
        else {
          return (configItem.section === item.section && configItem.category === item.category)
            ? {
              ...item,
              isActive: !item.isActive
            }
            : configItem;
        }
      });
    }
  }

  return { updateConfig };
};

export default useUpdateSettingsConfig;