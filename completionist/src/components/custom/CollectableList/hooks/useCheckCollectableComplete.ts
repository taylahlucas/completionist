import { Collectable } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';

interface CheckCollectableCompleteReturnType {
  checkCollectableComplete: (id: string) => boolean;
  checkCollectablesCompleteForCategory: (collectables: Collectable[]) => number;
}

const useCheckCollectableComplete = (): CheckCollectableCompleteReturnType => {
  const { completedCollectableIds } = useMainState();

  const checkCollectableComplete = (id: string): boolean => {
    return !!completedCollectableIds.find(collectableId => collectableId === id)
  };

  const checkCollectablesCompleteForCategory = (collectables: Collectable[]): number => {
    let count = 0;
    completedCollectableIds.forEach((collectableId) => {
      collectables.forEach((collectable) => {
        if (collectableId === collectable.id) {
          count += 1;
        }
      });
    })
    return count;
  }

  return { checkCollectableComplete, checkCollectablesCompleteForCategory }
}

export default useCheckCollectableComplete;