import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import Condition from '@components/general/Condition.native';
import LocationMainDropdown from './LocationMainDropdown';
import useGetLocationCategories from './hooks/useGetLocationCategories';
import useMainState from '@redux/hooks/useMainState';
import useLocationState from './hooks/useLocationState';
import LocationSearchResults from './LocationSearchResults.native';

const LocationList = () => {
  const { selectedGame } = useMainState();
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
        {getLocationDLC(selectedGame).map((dlc: string, index: number) => {
          const allLocationsForDLC = getLocationsForDLC(dlc);
          const completedLocations = checkLocationsCompleteForDLC(allLocationsForDLC);

          return (
            <Condition key={index} condition={allLocationsForDLC.length > 0}>
              <LocationMainDropdown
                key={index}
                dlc={dlc}
                completed={completedLocations.toString()}
                total={allLocationsForDLC.length.toString()}
              />
            </Condition>
          );
        })}
      </ScrollableList>
    </Condition>
  );
};

export default LocationList;