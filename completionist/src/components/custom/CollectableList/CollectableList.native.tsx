import React, { useEffect } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import CollectableMainListItem from './CollectableMainListItem.native';
import useGetCollectables from './hooks/useGetCollectables';
import Condition from '@components/general/Condition.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';

const CollectableList = () => {
  const { triggerShowSearchResults } = useMainDispatch();
  const { searchValue } = useMainState();
  const { getCollectablesForCategory, getAllCollectablesForCategory, getCollectableCategories } = useGetCollectables();
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();
  
  useEffect(() => {
    triggerShowSearchResults(searchValue.length >= 3);
  }, [searchValue])
  
  return (
    <ScrollableList>
      {getCollectableCategories().map((category: string, index: number) => {
        const allCollectablesForCategory = getAllCollectablesForCategory(category)
        const completedCollectables = checkCollectablesCompleteForCategory(allCollectablesForCategory)

        return (
          <Condition key={index} condition={getCollectablesForCategory(category).length > 0}>
            <CollectableMainListItem
              key={index} 
              category={category}
              completed={completedCollectables.toString()}
              total={allCollectablesForCategory.length.toString()}
            />
          </Condition>
        )
      })}
    </ScrollableList>
  );
};

export default CollectableList;