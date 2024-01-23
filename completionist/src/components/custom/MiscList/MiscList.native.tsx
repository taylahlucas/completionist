import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import MiscMainDropdown from './MiscMainDropdown.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import Condition from '@components/general/Condition.native';
import useGetMiscItemCategories from './hooks/useGetMiscItemCategories';
import MiscSearchResults from './MiscSearchResults.native';
import useMiscState from './hooks/useMiscState';

const MiscList = () => {
  const { searchValue } = useMiscState();
  const { getMiscItemCategories } = useGetMiscItemCategories();
  const { getMiscItemsForCategory } = useGetMiscItems();
  const { checkMiscItemsCompleteForCategory } = useCheckMiscItemComplete();

  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <MiscSearchResults />
      }
    >
      <ScrollableList>
        {getMiscItemCategories().map((category: string, index: number) => {
          const allMiscItemsForCategory = getMiscItemsForCategory(category);
          const completedMiscItems = checkMiscItemsCompleteForCategory(allMiscItemsForCategory);

          return (
            <MiscMainDropdown
              key={index}
              category={category}
              completed={completedMiscItems.toString()}
              total={allMiscItemsForCategory.length.toString()}
            />
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default MiscList;