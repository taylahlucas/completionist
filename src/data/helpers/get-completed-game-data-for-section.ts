import { GameData, IsActive } from '@api/';
import { ContentSectionEnum } from '@utils/custom-enums';

export const getCompletedGameDataForSection = (
  section: ContentSectionEnum,
  selectedGameData?: GameData,
): IsActive[] => {
  switch (section) {
    case ContentSectionEnum.QUESTS:
      return selectedGameData
        ? selectedGameData?.quests.filter(IsActive => IsActive.isActive)
        : [];
    case ContentSectionEnum.COLLECTABLES:
      return selectedGameData
        ? selectedGameData?.collectables.filter(IsActive => IsActive.isActive)
        : [];
    case ContentSectionEnum.LOCATIONS:
      return selectedGameData
        ? selectedGameData?.locations.filter(IsActive => IsActive.isActive)
        : [];
    case ContentSectionEnum.MISCELLANEOUS:
      return selectedGameData
        ? selectedGameData?.miscellaneous.filter(IsActive => IsActive.isActive)
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
