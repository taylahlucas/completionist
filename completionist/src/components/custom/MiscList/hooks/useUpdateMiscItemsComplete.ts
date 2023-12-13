import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import useCheckMiscItemComplete from './useCheckMiscItemComplete.native';

const useUpdateMiscItemsComplete = () => {
  const { setCompletedMiscItems } = useMainDispatch();
  const { user } = useMainState();
  const { checkMiscItemComplete } = useCheckMiscItemComplete();
  
  const updateMiscItemsComplete = (miscItemId: string) => {
    if (checkMiscItemComplete(miscItemId)) {
      const itemToUpdate = user.data.skyrim.miscellaneous.find(item => item.id === miscItemId);
      if (!!itemToUpdate) {
        const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
        const updateCompletedMiscItems: Item[] = user.data.skyrim.miscellaneous.map(miscItem => miscItem.id === itemToUpdate.id ? { ...miscItem, ...updatedObject } : miscItem)
        setCompletedMiscItems(updateCompletedMiscItems);
      }
    }
    else {
      const updateCompletedMiscItems: Item[] = [...user.data.skyrim.miscellaneous, { id: miscItemId, isComplete: true }];
      setCompletedMiscItems(updateCompletedMiscItems);
    }

  };
  
  return { updateMiscItemsComplete };
};

export default useUpdateMiscItemsComplete;