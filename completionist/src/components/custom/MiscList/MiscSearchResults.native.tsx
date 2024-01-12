import ListItem from '@components/general/Lists/ListItem.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import React from 'react';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import useGetMiscItems from './hooks/useGetMiscItems';

const MiscSearchResults = () => {
  const {
    getFilteredMiscItems,
    updateMiscItemsComplete
  } = useGetMiscItems();
  const {
    checkMiscItemComplete
  } = useCheckMiscItemComplete();
  
  return (
    <ScrollableList>
      {getFilteredMiscItems().map((item, index) => (
        <ListItem
          key={index}
          id={item.id}
          title={item.name}
          dlc={item.dlc}
          isComplete={checkMiscItemComplete(item.id)}
          action={((): void => updateMiscItemsComplete(item.id))}
        />
      ))}
    </ScrollableList>
  );
};

export default MiscSearchResults;