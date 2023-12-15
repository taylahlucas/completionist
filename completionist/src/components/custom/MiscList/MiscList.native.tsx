import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import MiscMainListItem from './MiscMainListItem.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import Condition from '@components/general/Condition.native';

const MiscList = () => {
  const { getMiscItemsForCategory, getMiscItemCategories } = useGetMiscItems();
  const { checkMiscItemsCompleteForCategory } = useCheckMiscItemComplete();
  
  return (
    <ScrollableList>
      {getMiscItemCategories().map((category: string, index: number) => {
        const allMiscItemsForCategory = getMiscItemsForCategory(category);
        const completedMiscItems = checkMiscItemsCompleteForCategory(allMiscItemsForCategory);

        return (
          <Condition key={index} condition={allMiscItemsForCategory.length > 0}>
            <MiscMainListItem
              key={index} 
              category={category}
              completed={completedMiscItems.toString()}
              total={allMiscItemsForCategory.length.toString()}
            />
          </Condition>
        )
      })}
    </ScrollableList>
  );
};

export default MiscList;