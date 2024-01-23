import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import Condition from '@components/general/Condition.native';
import LocationMainDropdown from './LocationMainDropdown';
import useGetLocationCategories from './hooks/useGetLocationCategories';
import useLocationState from './hooks/useLocationState';
import LocationSearchResults from './LocationSearchResults.native';

const LocationList = () => {
  const { searchValue } = useLocationState();
  const { getLocationDLC } = useGetLocationCategories();
  const { getLocationsForDLC } = useGetLocations();
  const { checkLocationsCompleteForDLC } = useCheckLocationComplete();

  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <LocationSearchResults />
      }
    >
      <ScrollableList>
        {getLocationDLC().map((dlc: string, index: number) => {
          const allLocationsForDLC = getLocationsForDLC(dlc);
          const completedLocations = checkLocationsCompleteForDLC(allLocationsForDLC);

          return (
            <LocationMainDropdown
              key={index}
              dlc={dlc}
              completed={completedLocations.toString()}
              total={allLocationsForDLC.length.toString()}
            />
          );
        })}
      </ScrollableList>
    </Condition>
  );
};

export default LocationList;