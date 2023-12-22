import React, { useState } from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { CollectableSubDropdownContainer } from './CollectableListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import CollectableSubDropdown from './CollectableSubDropdown.native';
import CollectableMainList from './CollectableMainList.native';
import useGetCollectables from './hooks/useGetCollectables';
import useMainState from '@redux/hooks/useMainState';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import useGetCollectableCategories from './hooks/useGetCollectableCategories';

export interface CollectableMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const CollectableMainDropdown = ({ category, completed, total }: CollectableMainDropdownProps) => {
  const { showSearchResults, selectedGame, userSettings } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getCollectableSubCategories } = useGetCollectableCategories();
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();
  const subCategories = getCollectableSubCategories(category, selectedGame);
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      enabled={userSettings?.find(settings => settings.category === category && settings.section === "Collectables")?.isActive ?? false}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      <CollectableSubDropdownContainer>
        {subCategories.map((subCategory, index) => {
          const collectablesForCategory = getCollectablesForSubCategory(category, subCategory);
          const completedCollectables = checkCollectablesCompleteForCategory(collectablesForCategory);

          return (
            <Condition key={index} condition={collectablesForCategory.length > 0}>
              <CollectableSubDropdown 
                key={index} 
                mainType={category} 
                subType={subCategory}
                completed={completedCollectables.toString()}
                total={collectablesForCategory.length.toString()}
              />
          </Condition>
          )
        })}
        <Condition condition={subCategories.length === 0 && getCollectablesForCategory(category).length > 0}>
          <CollectableMainList mainType={category} />
        </Condition>
      </CollectableSubDropdownContainer>
    </Dropdown>
  );
};

export default CollectableMainDropdown;