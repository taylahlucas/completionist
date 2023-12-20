import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useMainState from '@redux/hooks/useMainState';
import useGetLocations from './hooks/useGetLocations';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocationCategories from './hooks/useGetLocationCategories';
import LocationSubDropdown from './LocationSubDropdown.native';
import Condition from '@components/general/Condition.native';
import { CollectableSubDropdownContainer } from '../CollectableList/CollectableListStyledComponents.native';
import LocationMainList from './LocationMainList.native';

export interface LocationMainDropdownProps {
  dlc: string;
  completed: string;
  total: string;
}

const LocationMainDropdown = ({ dlc, completed, total }: LocationMainDropdownProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getLocationHoldsInDLC } = useGetLocationCategories();
  const { checkLocationsCompleteForHoldsInDLC } = useCheckLocationComplete();
  const { getLocationsForDLC, getLocationsForHoldInDLC } = useGetLocations();
  const holdsInDLC = getLocationHoldsInDLC(dlc);

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={dlc} completed={completed} total={total} />
      }
    >
      <CollectableSubDropdownContainer>
        {holdsInDLC.map((hold: string, index: number) => {
          const locationsForHold = getLocationsForHoldInDLC(dlc, hold);
          const completedLocations = checkLocationsCompleteForHoldsInDLC(locationsForHold, hold);

          // TODO: MainListItem for when there is no hold
          return (
            <Condition condition={locationsForHold.length > 0}>
              <LocationSubDropdown
                key={index}
                dlc={dlc}
                hold={hold}
                completed={completedLocations.toString()}
                total={locationsForHold.length.toString()}
              />
            </Condition>
          );
        })}
        <Condition condition={holdsInDLC.length === 0 && getLocationsForDLC(dlc).length > 0}>
          <LocationMainList dlc={dlc} />
        </Condition>
      </CollectableSubDropdownContainer>
    </Dropdown>
  );
};

export default LocationMainDropdown;