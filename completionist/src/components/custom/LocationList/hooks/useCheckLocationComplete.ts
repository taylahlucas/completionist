import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { Location } from '@utils/CustomInterfaces';

interface CheckLocationCompleteReturnType {
  checkLocationComplete: (id: string) => boolean;
  checkLocationsCompleteForCategory: (locations: Location[]) => number;
}

const useCheckLocationComplete = (): CheckLocationCompleteReturnType => {
  const { user, selectedGame } = useMainState();

  const checkLocationComplete = (id: string): boolean => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return !!user.data?.skyrim.locations.find(item => item.id === id && item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return !!user.data?.fallout4.locations.find(item => item.id === id && item.isComplete)
      default:
        return false
    }
  };

  const checkLocationsCompleteForCategory = (locations: Location[]): number => {
    let count = 0;
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        user.data?.skyrim.locations.forEach((location) => {
          locations.forEach((item) => {
            if (location.id === item.id && location.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      case SubscriptionTypeEnum.FALLOUT_4:
        user.data?.fallout4.locations.forEach((location) => {
          locations.forEach((item) => {
            if (location.id === item.id && location.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      default:
        return 0;
    }
  }

  return { checkLocationComplete, checkLocationsCompleteForCategory }
}

export default useCheckLocationComplete;