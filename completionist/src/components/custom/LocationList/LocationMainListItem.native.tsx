import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useMainState from '@redux/hooks/useMainState';
import useGetLocations from './hooks/useGetLocations';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocationCategories from './hooks/useGetLocationCategories';
import LocationSubListItem from './LocationSubListItem.native';
import Condition from '@components/general/Condition.native';

export interface LocationMainListItemProps {
  dlc: string;
  completed: string;
  total: string;
}

const LocationMainListItem = ({ dlc, completed, total }: LocationMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getLocationHoldsInDLC } = useGetLocationCategories();
  const { checkLocationsCompleteForHoldsInDLC } = useCheckLocationComplete();
  const { getLocationsForHoldInDLC } = useGetLocations();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={dlc} completed={completed} total={total} />
      }
    >
      {getLocationHoldsInDLC(dlc).map((hold: string, index: number) => {
        const locations = getLocationsForHoldInDLC(dlc, hold);
        const completedLocations = checkLocationsCompleteForHoldsInDLC(locations, hold);

        // TODO: MainListItem for when there is no hold
        return (
          <Condition condition={locations.length > 0} >
            <LocationSubListItem
              key={index}
              dlc={dlc}
              hold={hold}
              completed={completedLocations.toString()}
              total={locations.length.toString()}
            />
          </Condition>
        );
      })}
    </Dropdown >
  );
};

export default LocationMainListItem;