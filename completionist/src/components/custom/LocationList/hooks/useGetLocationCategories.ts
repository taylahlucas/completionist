import useGetGameData from '@data/hooks/useGetGameData';
import useGetSettingsConfig from '@data/hooks/useGetSettingsConfig';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface GetLocationReturnType {
  getLocationDLC: () => string[];
  getLocationHoldsInDLC: (dlc: string, selectedGame?: SubscriptionTypeEnum) => string[];
}

const useGetLocationCategories = (): GetLocationReturnType => {
  const { selectedGameData } = useMainState();
  const { mapDataToLocations } = useGetGameData();
  const {
    shouldShowCompletedItems,
    shouldShowDisabledSections
  } = useGetSettingsConfig();

  const getLocationDLC = (): string[] => {
    return (!!selectedGameData
      ? selectedGameData?.settingsConfig.filter(config =>
        config.section === "Locations"
        && config.category !== ""
        && (!shouldShowDisabledSections() ? config.isActive : true)
      )
        .map(config => config.category)
      : [])
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