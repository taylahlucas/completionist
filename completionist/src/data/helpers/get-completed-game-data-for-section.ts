import { ContentSectionEnum } from '@utils/custom-enums';
import { GameData, Item } from '@utils/custom-interfaces';

export const getCompletedGameDataForSection = (
  section: ContentSectionEnum,
  selectedGameData?: GameData,
): Item[] => {
  switch (section) {
    case ContentSectionEnum.QUESTS:
      return selectedGameData
        ? selectedGameData?.quests.filter(item => item.isComplete)
        : [];
    case ContentSectionEnum.COLLECTABLES:
      return selectedGameData
        ? selectedGameData?.collectables.filter(item => item.isComplete)
        : [];
    case ContentSectionEnum.LOCATIONS:
      return selectedGameData
        ? selectedGameData?.locations.filter(item => item.isComplete)
        : [];
    case ContentSectionEnum.MISCELLANEOUS:
      return selectedGameData
        ? selectedGameData?.miscellaneous.filter(item => item.isComplete)
        : [];
    default:
      return [];
  }
};

export const getAllCompletedGameDataForSection = (
  selectedGameData?: GameData,
) => {
  return {
    userQuests: getCompletedGameDataForSection(
      ContentSectionEnum.QUESTS,
      selectedGameData,
    ),
    userCollectables: getCompletedGameDataForSection(
      ContentSectionEnum.COLLECTABLES,
      selectedGameData,
    ),
    userLocations: getCompletedGameDataForSection(
      ContentSectionEnum.LOCATIONS,
      selectedGameData,
    ),
    userMiscellaneous: getCompletedGameDataForSection(
      ContentSectionEnum.MISCELLANEOUS,
      selectedGameData,
    ),
  };
};
