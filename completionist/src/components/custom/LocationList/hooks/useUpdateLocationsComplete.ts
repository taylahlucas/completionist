import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import useCheckLocationComplete from './useCheckLocationComplete.native';


const useUpdateLocationsComplete = () => {
  const { setCompletedLocations } = useMainDispatch();
  const { user } = useMainState();
  const { checkLocationComplete } = useCheckLocationComplete();
  
  const updateLocationsComplete = (locationId: string) => {
    if (checkLocationComplete(locationId)) {
      const itemToUpdate = user.data.skyrim.locations.find(item => item.id === locationId);
      if (!!itemToUpdate) {
        const updateCompletedLocations: Item[] = [...user.data.skyrim.locations, { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }];
        setCompletedLocations(updateCompletedLocations);
      }
    }
    else {
      const updateCompletedLocations: Item[] = [...user.data.skyrim.locations, { id: locationId, isComplete: true }];
      setCompletedLocations(updateCompletedLocations);
    }

  };
  
  return { updateLocationsComplete };
};

export default useUpdateLocationsComplete;