import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import useCheckCollectableComplete from './useCheckCollectableComplete';

const useUpdateCollectablesComplete = () => {
  const { setCompletedCollectables } = useMainDispatch();
  const { user } = useMainState();
  const { checkCollectableComplete } = useCheckCollectableComplete();
  
  const updateCollectablesComplete = (collectableId: string) => {
    if (checkCollectableComplete(collectableId)) {
      const itemToUpdate = user.data.skyrim.collectables.find(item => item.id === collectableId);
      if (!!itemToUpdate) {
        // TODO: Fix issue here with adding/removing
        const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
        const index = user.data.skyrim.collectables.findIndex((obj) => obj.id === updatedObject.id);
        if (index !== -1) {
          const updateCompletedCollectables = [...user.data.skyrim.collectables];
          updateCompletedCollectables[index] = { ...user.data.skyrim.collectables[index], ...updatedObject };
          setCompletedCollectables(updateCompletedCollectables);
        }
        // const updateCompletedCollectables: Item[] = user.data.skyrim.collectables.map(collectable => collectable.id === itemToUpdate.id ? { ...collectable, ...updatedObject } : collectable)
      }
    }
    else {
      const updateCompletedCollectables: Item[] = [...user.data.skyrim.collectables, { id: collectableId, isComplete: true }];
      setCompletedCollectables(updateCompletedCollectables);
    }

  };
  
  return { updateCollectablesComplete };
};

export default useUpdateCollectablesComplete;