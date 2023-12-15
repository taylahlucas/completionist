import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';
import useCheckLocationComplete from './useCheckLocationComplete';


const useUpdateLocationsComplete = () => {
  const { setCompletedLocations } = useMainDispatch();
  const { user } = useMainState();
  const { checkLocationComplete } = useCheckLocationComplete();
  
  const updateLocationsComplete = (locationId: string) => {
    if (checkLocationComplete(locationId)) {
      const itemToUpdate = user.data?.skyrim.locations.find(item => item.id === locationId);
      if (!!itemToUpdate) {
        const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
        const updateCompletedLocations: Item[] = user.data?.skyrim.locations.map(location => location.id === itemToUpdate.id ? { ...location, ...updatedObject } : location)
        setCompletedLocations(updateCompletedLocations);
      }
    }
    else {
      const updateCompletedLocations: Item[] = [...user.data?.skyrim.locations, { id: locationId, isComplete: true }];
      setCompletedLocations(updateCompletedLocations);
    }

  };
  
  return { updateLocationsComplete };
};

export default useUpdateLocationsComplete;