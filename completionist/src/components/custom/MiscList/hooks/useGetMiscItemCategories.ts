import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainState from '@redux/hooks/useMainState';

interface CheckLocationCompleteReturnType {
  getMiscItemCategories: () => string[];
}

const useGetMiscItemCategories = (): CheckLocationCompleteReturnType => {
  const { selectedGame } = useMainState();
  const { mapDataToMiscItems } = useGetGameData(selectedGame);
  const miscItems = mapDataToMiscItems();

  const getMiscItemCategories = (): string[] => {
    let miscItemCategories: string[] = [];
    miscItems.map(miscItem => {
      if (!miscItemCategories.find(item => item === miscItem.type)) {
        miscItemCategories.push(miscItem.type);
      }
    });
    return miscItemCategories;
  };

  return {
    getMiscItemCategories
  }
};

export default useGetMiscItemCategories;