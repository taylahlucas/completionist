import React from 'react';
import Condition from '@components/general/Condition.native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { CollectableSubDropdownContainer } from './CollectableListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import CollectableSubDropdown from './CollectableSubDropdown.native';
import CollectableMainList from './CollectableMainList.native';
import useGetCollectables from './hooks/useGetContent';
import useMainState from '@redux/hooks/useMainState';
import useCheckCollectableComplete from './hooks/useCheckCollectableComplete';
import useGetCollectableCategories from './hooks/useGetContentCategories';
import useCollectableState from './hooks/useCollectableState';
import useCollectableDispatch from './hooks/useCollectableDispatch';
import { SubListContainer } from '@components/general/Lists/ListStyledComponents.native';

export interface ContentMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const ContentMainDropdown = ({ category, completed, total }: ContentMainDropdownProps) => {
  const { selectedGame, userSettings } = useMainState();
  const { setSelectedCategory } = useCollectableDispatch();
  const { selectedCategory } = useCollectableState();
  const { getCollectableSubCategories } = useGetCollectableCategories();
  const { getCollectablesForSubCategory } = useGetCollectables();
  const subCategories = getCollectableSubCategories(category, selectedGame);
  const { checkCollectablesCompleteForCategory } = useCheckCollectableComplete();
  const isEnabled: boolean = userSettings?.find(settings => settings.category === category && settings.section === "Collectables")?.isActive ?? false;

  return (
    <Dropdown
      isOpen={category === selectedCategory.category}
      setOpen={(): void => setSelectedCategory({
        ...selectedCategory,
        category: category === selectedCategory.category ? '' : category
      })}
      enabled={isEnabled}
      header={
        <ListHeader title={category} enabled={isEnabled} completed={completed} total={total} />
      }
    >
      <SubListContainer>
        <Condition
          condition={subCategories.length > 0}
          conditionalElement={
            <CollectableMainList subCategory={category} />
          }>
          {subCategories.map((subCategory, index) => {
            const collectablesForCategory = getCollectablesForSubCategory(category, subCategory);
            const completedCollectables = checkCollectablesCompleteForCategory(collectablesForCategory);

            return (
              <CollectableSubDropdown
                key={index}
                mainCategory={category}
                subCategory={subCategory}
                completed={completedCollectables.toString()}
                total={collectablesForCategory.length.toString()}
              />
            )
          })}
        </Condition>
      </SubListContainer>
    </Dropdown>
  );
};

export default ContentMainDropdown;