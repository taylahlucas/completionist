import React from 'react';
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
import useCollectableState from './hooks/useCollectableState';
import useCollectableDispatch from './hooks/useCollectableDispatch';

export interface CollectableMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const CollectableMainDropdown = ({ category, completed, total }: CollectableMainDropdownProps) => {
  const { selectedGame, userSettings } = useMainState();
  const { setSelectedCategory } = useCollectableDispatch();
  const { selectedCategory } = useCollectableState();
  const { getCollectableSubCategories } = useGetCollectableCategories();
  const { getCollectablesForSubCategory, getCollectablesForCategory } = useGetCollectables();
  const subCategories = getCollectableSubCategories(category, selectedGame);
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();
  
  return (
    <Dropdown
      isOpen={category === selectedCategory.category}
      setOpen={(): void => setSelectedCategory({
        ...selectedCategory,
        category: category === selectedCategory.category ? '' : category
      })}
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
                mainCategory={category} 
                subCategory={subCategory}
                completed={completedCollectables.toString()}
                total={collectablesForCategory.length.toString()}
              />
          </Condition>
          )
        })}
        <Condition condition={subCategories.length === 0 && getCollectablesForCategory(category).length > 0}>
          <CollectableMainList mainCategory={category} />
        </Condition>
      </CollectableSubDropdownContainer>
    </Dropdown>
  );
};

export default CollectableMainDropdown;