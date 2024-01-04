import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface GameDataReturnType {
  getCollectableCategories: (selectedGame?: SubscriptionTypeEnum) => string[];
  getCollectableSubCategories: (category: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetCollectableCategories = (): GameDataReturnType => {
  const { mapDataToCollectables } = useGetGameData();

  const getCollectableCategories = (selectedGame?: SubscriptionTypeEnum): string[] => {
    const collectables = mapDataToCollectables(selectedGame);
    let collectableCategories: string[] = [];
    collectables.map(collectable => {
      if (!collectableCategories.find(item => item === collectable.mainCategory)) {
        collectableCategories.push(collectable.mainCategory);
      }
    });
    return collectableCategories;
  }

  const getCollectableSubCategories = (category: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const collectables = mapDataToCollectables(selectedGame);
    const filteredCollectables = collectables.filter(collectable => collectable.mainCategory === category);
    let collectableSubCategories: string[] = [];
    filteredCollectables.map(collectable => {
      if (!collectableSubCategories.find(item => item === collectable.subType)) {
        if (!!collectable.subType) {
          collectableSubCategories.push(collectable.subType);
        }
      }
    });
    return collectableSubCategories;
  }
  return {
    getCollectableCategories,
    getCollectableSubCategories
  }
};

export default useGetCollectableCategories;