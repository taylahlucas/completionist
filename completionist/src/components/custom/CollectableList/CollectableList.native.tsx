import React from 'react';
import { getCollectableCategories } from '@data/functions.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import CollectableMainListItem from './CollectableMainListItem.native';

const CollectableList = () => {
  const collectableCategories = getCollectableCategories();
  
  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {collectableCategories.map((category: string, index: number) => (
        <CollectableMainListItem key={index} category={category} />
      ))}
    </ScrollableList>
  );
};

export default CollectableList;