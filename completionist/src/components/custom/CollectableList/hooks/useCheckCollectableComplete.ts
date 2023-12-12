import { Collectable } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';

interface CheckCollectableCompleteReturnType {
  checkCollectableComplete: (id: string) => boolean;
  checkCollectablesCompleteForCategory: (collectables: Collectable[]) => number;
}

const useCheckCollectableComplete = (): CheckCollectableCompleteReturnType => {
  const { user } = useMainState();

  const checkCollectableComplete = (id: string): boolean => {
    return !!user.data.skyrim.collectables.find(item => item.id === id);
  };

  const checkCollectablesCompleteForCategory = (collectables: Collectable[]): number => {
    let count = 0;
    user.data.skyrim.collectables.forEach((collectable) => {
      collectables.forEach((item) => {
        if (collectable.id === item.id) {
          count += 1;
        }
      });
    })
    return count;
  }

  return { checkCollectableComplete, checkCollectablesCompleteForCategory }
}

export default useCheckCollectableComplete;