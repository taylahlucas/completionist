import React, { useEffect } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import CollectableMainDropdown from './CollectableMainDropdown.native';
import useGetCollectables from './hooks/useGetCollectables';
import Condition from '@components/general/Condition.native';
import useMainState from '@redux/hooks/useMainState';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import useGetCollectableCategories from './hooks/useGetCollectableCategories';
import useCollectableState from './hooks/useCollectableState';
import CollectableSearchResults from './CollectableSearchResults.native';

const CollectableList = () => {
  const { selectedGame } = useMainState();
  const { searchValue } = useCollectableState();
  const { getCollectableCategories } = useGetCollectableCategories();
  const {
    getCollectablesForCategory,
    getAllCollectablesForCategory
  } = useGetCollectables();
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();

  //  TODO: Add subtitles for DLC
  return (
    <Condition
      condition={searchValue.length < 2}
      conditionalElement={
        <CollectableSearchResults />
      }
    >
      <ScrollableList>
        {getCollectableCategories(selectedGame).map((category: string, index: number) => {
          const allCollectablesForCategory = getAllCollectablesForCategory(category)
          const completedCollectables = checkCollectablesCompleteForCategory(allCollectablesForCategory)

          return (
            <Condition key={index} condition={getCollectablesForCategory(category).length > 0}>
              <CollectableMainDropdown
                key={index}
                category={category}
                completed={completedCollectables.toString()}
                total={allCollectablesForCategory.length.toString()}
              />
            </Condition>
          )
        })}
      </ScrollableList>
    </Condition>
  );
};

export default CollectableList;