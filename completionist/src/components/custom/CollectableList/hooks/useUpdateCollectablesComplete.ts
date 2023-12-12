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
        const updateCompletedCollectables: Item[] = [...user.data.skyrim.collectables, { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }];
        setCompletedCollectables(updateCompletedCollectables);
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