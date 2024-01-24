import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import useContentState from './useContentState';

const useUpdateContent = () => {
  const { setCompletedQuests, setCompletedCollectables, setCompletedLocations, setCompletedMiscItems } = useMainDispatch();
  const { selectedGameData } = useMainState();
  const { sectionType } = useContentState();

  const updateContentAction = (itemId: string, completedContent: Item[], itemToUpdate?: Item) => {
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedContent: Item[] = completedContent.map(item => item.id === itemToUpdate.id ? { ...item, ...updatedObject } : item)

      return updateCompletedContent;
    }
    else {
      const updateCompletedContent: Item[] = [...completedContent, { id: itemId, isComplete: true }];
      return updateCompletedContent;
    }
  };

  const updateContentComplete = (itemId: string) => {
    let completedContent = [];
    switch (sectionType) {
      case 'Quests':
        completedContent = selectedGameData?.quests.filter(item => item.isComplete) ?? [];
        break;
      case 'Collectables':
        completedContent = selectedGameData?.collectables.filter(item => item.isComplete) ?? [];
        break;
      case 'Locations':
        completedContent = selectedGameData?.locations.filter(item => item.isComplete) ?? [];
        break;
      case 'Miscellaneous':
        completedContent = selectedGameData?.miscellaneous.filter(item => item.isComplete) ?? [];
        break;
    }
    const itemToUpdate = completedContent.find(item => item.id === itemId);
    const updatedContent = updateContentAction(itemId, completedContent, itemToUpdate);

    switch (sectionType) {
      case 'Quests':
        setCompletedQuests(updatedContent);
        break;
      case 'Collectables':
        setCompletedCollectables(updatedContent);
        break;
      case 'Locations':
        setCompletedLocations(updatedContent);
        break;
      case 'Miscellaneous':
        setCompletedMiscItems(updatedContent);
        break;
    }
  };

  return { updateContentComplete };
};

export default useUpdateContent;