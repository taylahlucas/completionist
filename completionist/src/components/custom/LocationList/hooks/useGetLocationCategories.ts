import useGetGameData from '@data/hooks/useGetGameData.native';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface GetLocationReturnType {
  getLocationDLC: (selectedGame?: SubscriptionTypeEnum) => string[];
  getLocationHoldsInDLC: (dlc: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetLocationCategories = (): GetLocationReturnType => {
  const { mapDataToLocations } = useGetGameData();

  const getLocationDLC = (selectedGame?: SubscriptionTypeEnum): string[] => {
    const locations = mapDataToLocations(selectedGame);
    let locationCategories: string[] = [];

    locations.map(location => {
      if (!locationCategories.find(item => item === location.dlc)) {
        locationCategories.push(location.dlc);
      }
    });
    return locationCategories;
  };

  const getLocationHoldsInDLC = (dlc: string, selectedGame?: SubscriptionTypeEnum): string[] => {
    const locations = mapDataToLocations(selectedGame);
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