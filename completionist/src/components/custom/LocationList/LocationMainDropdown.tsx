import React from 'react';
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
import useLocationState from './hooks/useLocationState';
import useLocationDispatch from './hooks/useLocationDispatch';

export interface LocationMainDropdownProps {
  dlc: string;
  completed: string;
  total: string;
}

const LocationMainDropdown = ({ dlc, completed, total }: LocationMainDropdownProps) => {
  const { selectedGame, userSettings } = useMainState();
  const { setSelectedCategory } = useLocationDispatch();
  const { selectedCategory } = useLocationState();
  const { getLocationHoldsInDLC } = useGetLocationCategories();
  const { checkLocationsCompleteForHoldsInDLC } = useCheckLocationComplete();
  const { getLocationsForDLC, getLocationsForHoldInDLC } = useGetLocations();
  const holdsInDLC = getLocationHoldsInDLC(dlc, selectedGame);

  return (
    <Dropdown
      isOpen={dlc === selectedCategory.category}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        category: dlc === selectedCategory.category ? '' : dlc
      })}
      enabled={userSettings?.find(settings => settings.category === dlc && settings.section === "Locations")?.isActive ?? false}
      header={
        <ListHeader title={dlc === 'None' ? 'Main' : dlc} completed={completed} total={total} />
      }
    >
      <CollectableSubDropdownContainer>
        {holdsInDLC.map((hold: string, index: number) => {
          const locationsForHold = getLocationsForHoldInDLC(dlc, hold);
          const completedLocations = checkLocationsCompleteForHoldsInDLC(locationsForHold, hold);
          
          return (
            <Condition key={index} condition={locationsForHold.length > 0}>
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