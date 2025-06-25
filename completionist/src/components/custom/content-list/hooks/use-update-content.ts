import { useMainState, useMainDispatch } from '@redux/hooks';
import { Item } from '@utils/CustomInterfaces';
import { useContentState } from '../provider';
import { ContentSectionEnum } from '@utils/CustomEnums';

export const useUpdateContent = () => {
  const {
    setCompletedQuests,
    setCompletedCollectables,
    setCompletedLocations,
    setCompletedMiscItems,
  } = useMainDispatch();
  const { selectedGame } = useMainState();
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
          selectedGame?.quests.filter(item => item.isComplete) ?? [];
        break;
      case ContentSectionEnum.COLLECTABLES:
        completedContent =
          selectedGame?.collectables.filter(item => item.isComplete) ?? [];
        break;
      case ContentSectionEnum.LOCATIONS:
        completedContent =
          selectedGame?.locations.filter(item => item.isComplete) ?? [];
        break;
      case ContentSectionEnum.MISCELLANEOUS:
        completedContent =
          selectedGame?.miscellaneous.filter(item => item.isComplete) ?? [];
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
