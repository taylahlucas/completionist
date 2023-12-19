import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useCheckLocationComplete from './hooks/useCheckLocationComplete';
import useGetLocations from './hooks/useGetLocations';
import Condition from '@components/general/Condition.native';
import LocationMainListItem from './LocationMainListItem.native';
import useGetLocationCategories from './hooks/useGetLocationCategories';

const LocationList = () => {
  const { getLocationCategories } = useGetLocationCategories();
  const { getLocationsForCategory } = useGetLocations();
  const { checkLocationsCompleteForCategory } = useCheckLocationComplete();

  // TODO: Sort locations by dlc

  return (
    <ScrollableList>
      {getLocationCategories().map((category: string, index: number) => {
        const allLocationsForCategory = getLocationsForCategory(category);
        const completedLocations = checkLocationsCompleteForCategory(allLocationsForCategory);

        return (
          <Condition key={index} condition={allLocationsForCategory.length > 0}>
            <LocationMainListItem
              key={index}
              category={category}
              completed={completedLocations.toString()}
              total={allLocationsForCategory.length.toString()}
            />
          </Condition>
        );
      })}
    </ScrollableList>
  );
};

export default LocationList;