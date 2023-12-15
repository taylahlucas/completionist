import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainState from '@redux/hooks/useMainState';

interface GetLocationReturnType {
  getLocationCategories: () => string[];
}

const useGetLocationCategories = (): GetLocationReturnType => {
  const { selectedGame } = useMainState();
  const { mapDataToLocations } = useGetGameData(selectedGame);
  const locations = mapDataToLocations();

  const getLocationCategories = (): string[] => {
    let locationCategories: string[] = [];
    locations.map(location => {
      if (!locationCategories.find(item => item === location.hold)) {
        locationCategories.push(location.hold);
      }
    });
    return locationCategories;
  };

  return {
    getLocationCategories
  }
};

export default useGetLocationCategories;