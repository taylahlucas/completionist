import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import Condition from '@components/general/Condition.native';
import LocationMainListItem from './LocationMainListItem.native';
import useGetLocationCategories from './hooks/useGetLocationCategories';

const LocationList = () => {
  const { getLocationDLC } = useGetLocationCategories();
  const { getLocationsForDLC } = useGetLocations();
  const { checkLocationsCompleteForDLC } = useCheckLocationComplete();
  
  return (
    <ScrollableList>
      {getLocationDLC().map((dlc: string, index: number) => {
        const allLocationsForDLC = getLocationsForDLC(dlc);
        const completedLocations = checkLocationsCompleteForDLC(allLocationsForDLC);

        return (
          <Condition key={index} condition={allLocationsForDLC.length > 0}>
            <LocationMainListItem
              key={index}
              dlc={dlc}
              completed={completedLocations.toString()}
              total={allLocationsForDLC.length.toString()}
            />
          </Condition>
        );
      })}
    </ScrollableList>
  );
};

export default LocationList;