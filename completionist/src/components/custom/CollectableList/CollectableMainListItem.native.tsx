import React, { useState } from 'react';
import { getCollectableSubCategories } from '@data/functions';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { CollectableListSubListContainer } from './CollectableListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import CollectableSubListItem from './CollectableSubListItem.native';
import CollectableSubTypeMainListItem from './CollectableSubTypeMainListItem.native';
import useGetCollectables from './hooks/useGetColletables.native';
import useMainState from 'src/redux/hooks/useMainState.native';

export interface CollectableMainListItemProps {
  category: string;
}

const CollectableMainListItem = ({ category }: CollectableMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const subCategories = getCollectableSubCategories(category);
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} />
      }
    >
      <CollectableListSubListContainer>
        {subCategories.map((subCategory, index) => 
          <Condition key={index} condition={getCollectablesForSubCategory(category, subCategory).length > 0}>
             <CollectableSubListItem key={index} mainType={category} subType={subCategory} />
          </Condition>
        )}
        <Condition condition={subCategories.length === 0 && getCollectablesForCategory(category).length > 0}>
          <CollectableSubTypeMainListItem mainType={category} />
        </Condition>
      </CollectableListSubListContainer>
    </Dropdown>
  );
};

export default CollectableMainListItem;