import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import MiscMainListItem from './MiscMainListItem.native';
import useGetMiscItemCategories from './hooks/useGetMiscItemCategories.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete.native';
import Condition from '@components/general/Condition.native';

const MiscList = () => {
  const miscItemCategories = useGetMiscItemCategories();
  const { getMiscItemsForCategory } = useGetMiscItems();
  const { checkMiscItemsCompleteForCategory } = useCheckMiscItemComplete();
  
  return (
    <ScrollableList>
      {miscItemCategories.map((category: string, index: number) => {
        const allMiscItemsForCategory = getMiscItemsForCategory(category);
        const completedMiscItems = checkMiscItemsCompleteForCategory(allMiscItemsForCategory);

        return (
          <Condition key={index} condition={getMiscItemsForCategory(category).length > 0}>
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