import { SettingsConfigItem } from '@utils/index';

// Filter active sections
export const filterActiveSections = (
  config: SettingsConfigItem[],
  data: any[],
) => {
  const filteredConfig = config.filter(item => !item.section.isActive);
  filteredConfig.map(config => {
    data = data.filter(item => item.mainCategory !== config.section);
  });

  return data;
};
