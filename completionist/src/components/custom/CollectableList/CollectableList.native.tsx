import React from 'react';
import { getCollectableCategories } from '@data/functions';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import CollectableMainListItem from './CollectableMainListItem.native';
import useGetCollectables from './hooks/useGetColletables.native';
import Condition from '@components/general/Condition.native';

const CollectableList = () => {
  const collectableCategories = getCollectableCategories();
  const { getCollectablesForCategory } = useGetCollectables();
  
  return (
    <ScrollableList style={{ marginTop: 16 }}>
      {collectableCategories.map((category: string, index: number) => (
        <Condition key={index} condition={getCollectablesForCategory(category).length > 0}>
          <CollectableMainListItem key={index} category={category} />
        </Condition>
      ))}
    </ScrollableList>
  );
};

export default CollectableList;