import { SettingsConfigItem, IsActive } from '@utils/index';

export const useUpdateSettingsConfig = () => {
  const updateConfig = (
    config: SettingsConfigItem[],
    item: IsActive,
  ): SettingsConfigItem[] => {
    return config.map(section => {
      // Main category
      if (item.id === section.section.id) {
        return {
          section: {
            id: section.section.id,
            // TODO: This is not updating
            isActive: !section.section.isActive,
          },
          categories: section.categories.map(category => {
            return {
              id: category.id,
              isActive: !section.section.isActive,
            };
          }),
          dlc: section.dlc?.map(dlc => {
            return {
              id: dlc.id,
              isActive: !section.section.isActive,
            };
          }),
        };
      } else {
        // Sub category
        return {
          section: section.section,
          categories: section.categories.map(category => {
            if (category.id === item.id) {
              return {
                id: category.id,
                isActive: !category.isActive,
              };
            } else {
              return category;
            }
          }),
          dlc: section.dlc?.map(dlc => {
            if (dlc.id === item.id) {
              return {
                id: dlc.id,
                isActive: !dlc.isActive,
              };
            } else {
              return dlc;
            }
          }),
        };
      }
    }) as SettingsConfigItem[];
  };

  return { updateConfig };
};
