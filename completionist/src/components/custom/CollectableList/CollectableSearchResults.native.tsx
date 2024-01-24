import ListItem from '@components/general/Lists/ListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import React from 'react';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import useGetCollectables from './hooks/useGetCollectables';

const CollectableSearchResults = () => {
  const {
    getFilteredCollectables,
    updateCollectablesComplete
  } = useGetCollectables();
  const {
    checkCollectableComplete
  } = useCheckCollectableComplete();
  
  return (
    <ScrollableList>
      {getFilteredCollectables().map((collectable, index) => (
        <ListItem
          key={index}
          id={collectable.id}
          title={collectable.title}
          isComplete={checkCollectableComplete(collectable.id)}
          action={((): void => updateCollectablesComplete(collectable.id))}
        />
      ))}
    </ScrollableList>
  );
};

export default CollectableSearchResults;