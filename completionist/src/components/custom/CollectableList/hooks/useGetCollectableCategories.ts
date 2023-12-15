import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainState from '@redux/hooks/useMainState';

interface GameDataReturnType {
  getCollectableCategories: () => string[];
  getCollectableSubCategories: (category: string) => string[];
}

const useGetCollectableCategories = (): GameDataReturnType => {
  const { selectedGame } = useMainState();
  const { mapDataToCollectables } = useGetGameData(selectedGame);
  const collectables = mapDataToCollectables();

  const getCollectableCategories = (): string[] => {
    let collectableCategories: string[] = [];
    collectables.map(collectable => {
      if (!collectableCategories.find(item => item === collectable.type)) {
        collectableCategories.push(collectable.type);
      }
    });
    return collectableCategories;
  }

  const getCollectableSubCategories = (category: string): string[] => {
    const filteredCollectables = collectables.filter(collectable => collectable.type === category);
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