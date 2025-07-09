import { useContentState } from '@features/game-content/provider';
import { useMainDispatch } from '@redux/hooks';
import { Item, ContentSectionEnum, GameData } from '@utils/index';

export const useUpdateContent = (selectedGameData?: GameData) => {
  const {
    setCompletedQuests,
    setCompletedCollectables,
    setCompletedLocations,
    setCompletedMiscItems,
  } = useMainDispatch();
  const { sectionType } = useContentState();

  const updateContentAction = (
    itemId: string,
    completedContent: Item[],
    itemToUpdate?: Item,
  ) => {
    if (!!itemToUpdate) {
      const updatedObject = {
        id: itemToUpdate?.id,
        isComplete: !itemToUpdate?.isComplete,
      };
      const updateCompletedContent: Item[] = completedContent.map(item =>
        item.id === itemToUpdate.id ? { ...item, ...updatedObject } : item,
      );

      return updateCompletedContent;
    } else {
      const updateCompletedContent: Item[] = [
        ...completedContent,
        { id: itemId, isComplete: true },
      ];
      return updateCompletedContent;
    }
  };

  const updateContentComplete = (itemId: string) => {
    let completedContent: Item[] = [];
    switch (sectionType) {
      case ContentSectionEnum.QUESTS:
        completedContent =
          selectedGameData?.quests.filter(item => item.isComplete) ?? [];
        break;
      case ContentSectionEnum.COLLECTABLES:
        completedContent =
          selectedGameData?.collectables.filter(item => item.isComplete) ?? [];
        break;
      case ContentSectionEnum.LOCATIONS:
        completedContent =
          selectedGameData?.locations.filter(item => item.isComplete) ?? [];
        break;
      case ContentSectionEnum.MISCELLANEOUS:
        completedContent =
          selectedGameData?.miscellaneous.filter(item => item.isComplete) ?? [];
        break;
    }
    const itemToUpdate = completedContent.find(item => item.id === itemId);
    const updatedContent = updateContentAction(
      itemId,
      completedContent,
      itemToUpdate,
    );

    switch (sectionType) {
      case ContentSectionEnum.QUESTS:
        setCompletedQuests(updatedContent);
        break;
      case ContentSectionEnum.COLLECTABLES:
        setCompletedCollectables(updatedContent);
        break;
      case ContentSectionEnum.LOCATIONS:
        setCompletedLocations(updatedContent);
        break;
      case ContentSectionEnum.MISCELLANEOUS:
        setCompletedMiscItems(updatedContent);
        break;
    }
  };

  return { updateContentComplete };
};
