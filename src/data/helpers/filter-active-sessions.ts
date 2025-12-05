import { GameSettingsItem } from 'src/api/generated/types';

// Filter active sections
export const filterActiveSections = (
  config: GameSettingsItem[],
  data: any[],
) => {
  const filteredConfig = config.filter(item => !item.section.isActive);
  filteredConfig.map(config => {
    data = data.filter(item => item.mainCategory !== config.section);
  });

  return data;
};
