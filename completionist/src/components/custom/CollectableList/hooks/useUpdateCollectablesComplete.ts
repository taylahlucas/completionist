import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';

const useUpdateCollectablesComplete = () => {
  const { setCompletedCollectables } = useMainDispatch();
  const { user } = useMainState();
  
  const updateCollectablesComplete = (collectableId: string) => {
    const itemToUpdate = user.data?.skyrim.collectables.find(item => item.id === collectableId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedCollectables: Item[] = user.data?.skyrim.collectables.map(collectable => collectable.id === itemToUpdate.id ? { ...collectable, ...updatedObject } : collectable);
      setCompletedCollectables(updateCompletedCollectables);
    }
    else {
      const updateCompletedCollectables: Item[] = [...user.data?.skyrim.collectables, { id: collectableId, isComplete: true }];
      setCompletedCollectables(updateCompletedCollectables);
    }
  };
  
  return { updateCollectablesComplete };
};

export default useUpdateCollectablesComplete;