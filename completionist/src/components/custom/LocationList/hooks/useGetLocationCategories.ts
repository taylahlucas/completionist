import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainState from '@redux/hooks/useMainState';

interface GetLocationReturnType {
  getLocationDLC: () => string[];
  getLocationHoldsInDLC: (dlc: string) => string[];
}

const useGetLocationCategories = (): GetLocationReturnType => {
  const { selectedGame } = useMainState();
  const { mapDataToLocations } = useGetGameData(selectedGame);
  const locations = mapDataToLocations();

  const getLocationDLC = (): string[] => {
    let locationCategories: string[] = [];
    locations.map(location => {
      if (!locationCategories.find(item => item === location.dlc)) {
        locationCategories.push(location.dlc);
      }
    });
    return locationCategories;
  };

  const getLocationHoldsInDLC = (dlc: string): string[] => {
    let locationCategories: string[] = [];

    locations.map(location => {
      if (!locationCategories.find(item => item === location.hold)) {
        if (location.dlc === dlc) {
          locationCategories.push(location.hold);
        }
      }
    });
    return locationCategories;
  };

  return {
    getLocationDLC,
    getLocationHoldsInDLC
  }
};

export default useGetLocationCategories;