import useGetGameData from '@data/hooks/useGetGameData.native';

interface GetLocationReturnType {
  getLocationCategories: () => string[];
}

const useGetLocationCategories = (): GetLocationReturnType => {
  const { mapDataToLocations } = useGetGameData();
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