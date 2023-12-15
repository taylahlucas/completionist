import React, { useState } from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { CollectableListSubListContainer } from './CollectableListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import CollectableSubListItem from './CollectableSubListItem.native';
import CollectableSubTypeMainListItem from './CollectableSubTypeMainListItem.native';
import useGetCollectables from './hooks/useGetCollectables';
import useMainState from '@redux/hooks/useMainState';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';

export interface CollectableMainListItemProps {
  category: string;
  completed: string;
  total: string;
}

const CollectableMainListItem = ({ category, completed, total }: CollectableMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getCollectablesForSubCategory, getCollectablesForCategory, getCollectableSubCategories } = useGetCollectables();
  const subCategories = getCollectableSubCategories(category);
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      <CollectableListSubListContainer>
        {subCategories.map((subCategory, index) => {
          const collectablesForCategory = getCollectablesForSubCategory(category, subCategory);
          const completedCollectables = checkCollectablesCompleteForCategory(collectablesForCategory);

          return (
            <Condition key={index} condition={collectablesForCategory.length > 0}>
              <CollectableSubListItem 
                key={index} 
                mainType={category} 
                subType={subCategory}
                completed={completedCollectables.toString()}
                total={collectablesForCategory.length.toString()}
              />
          </Condition>
          )
        }
        )}
        <Condition condition={subCategories.length === 0 && getCollectablesForCategory(category).length > 0}>
          <CollectableSubTypeMainListItem mainType={category} />
        </Condition>
      </CollectableListSubListContainer>
    </Dropdown>
  );
};

export default CollectableMainListItem;