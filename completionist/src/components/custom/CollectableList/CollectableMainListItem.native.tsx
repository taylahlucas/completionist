import React, { useState } from 'react';
import { getCollectableSubCategories } from '@data/functions.native';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
// import QuestSubListItem from './QuestSubListItem.native';
// import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';
import { CollectableListSubListContainer } from './CollectableListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import CollectableSubListItem from './CollectableSubListItem.native';
import { View } from 'react-native';
import CollectableSubTypeMainListItem from './CollectableSubTypeMainListItem.native';

export interface CollectableMainListItemProps {
  category: string;
}

const CollectableMainListItem = ({ category }: CollectableMainListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const subCategories = getCollectableSubCategories(category);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} />
      }
    >
      <CollectableListSubListContainer>
        {subCategories.map((subCategory, index) => 
          <CollectableSubListItem key={index} category={subCategory} />
        )}
        <Condition condition={subCategories.length === 0}>
          <CollectableSubTypeMainListItem type={category} />
        </Condition>
      </CollectableListSubListContainer>
    </Dropdown>
  );
};

export default CollectableMainListItem;