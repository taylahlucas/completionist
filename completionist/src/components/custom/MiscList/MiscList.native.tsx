import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import MiscMainDropdown from './MiscMainDropdown.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import Condition from '@components/general/Condition.native';
import useGetMiscItemCategories from './hooks/useGetMiscItemCategories';
import useMainState from '@redux/hooks/useMainState';
import MiscSearchResults from './MiscSearchResults.native';
import useMiscState from './hooks/useMiscState';

const MiscList = () => {
  const { selectedGame } = useMainState();
  const { searchValue } = useMiscState();
  const { getMiscItemCategories } = useGetMiscItemCategories();
  const { getMiscItemsForCategory } = useGetMiscItems();
  const { checkMiscItemsCompleteForCategory } = useCheckMiscItemComplete();
  // TODO: Fix scroll on nested list
  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <MiscSearchResults />
      }
    >
      <ScrollableList>
        {getMiscItemCategories(selectedGame).map((category: string, index: number) => {
          const allMiscItemsForCategory = getMiscItemsForCategory(category);
          const completedMiscItems = checkMiscItemsCompleteForCategory(allMiscItemsForCategory);

          return (
            <Condition key={index} condition={allMiscItemsForCategory.length > 0}>
              <MiscMainDropdown
                key={index}
                category={category}
                completed={completedMiscItems.toString()}
                total={allMiscItemsForCategory.length.toString()}
              />
            </Condition>
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default MiscList;