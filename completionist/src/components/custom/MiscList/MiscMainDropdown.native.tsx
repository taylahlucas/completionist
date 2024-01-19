import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import ListItem from '@components/general/Lists/ListItem.native';
import { MiscItem } from '@utils/CustomInterfaces';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';
import useMiscState from './hooks/useMiscState';
import useMiscDispatch from './hooks/useMiscDispatch';
import { ListItemScrollableList } from '@components/general/Lists/ListStyledComponents.native';
import useGetMiscItemCategories from './hooks/useGetMiscItemCategories';
import useMainState from '@redux/hooks/useMainState';
import Condition from '@components/general/Condition.native';
import MiscItemSubDropdown from './MiscItemSubDropdown.native';
import { CollectableSubDropdownContainer } from '../CollectableList/CollectableListStyledComponents.native';
import MiscItemMainList from './MiscItemMainList.native';

export interface MiscMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const MiscMainDropdown = ({ category, completed, total }: MiscMainDropdownProps) => {
  const { userSettings, selectedGame } = useMainState();
  const { setSelectedCategory } = useMiscDispatch();
  const { selectedCategory } = useMiscState();
  const { getMiscItemsForCategory, getMiscItemsForSubCategory } = useGetMiscItems()
  const { checkMiscItemsCompleteForCategory } = useCheckMiscItemComplete();
  const { getMiscItemSubCategories } = useGetMiscItemCategories();
  const subCategories = getMiscItemSubCategories(category, selectedGame);
  const isEnabled: boolean = userSettings?.find(settings => settings.category === category && settings.section === "Miscellaneous")?.isActive ?? false;

  return (
    <Dropdown
      isOpen={category === selectedCategory.category}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        category: category === selectedCategory.category ? '' : category
      })}
      enabled={isEnabled}
      header={
        <ListHeader title={category} enabled={isEnabled} completed={completed} total={total} />
      }
    >
      <CollectableSubDropdownContainer>
        {subCategories.map((subCategory, index) => {
          const collectablesForCategory = getMiscItemsForSubCategory(category, subCategory);
          const completedMiscItems = checkMiscItemsCompleteForCategory(collectablesForCategory);

          return (
            <Condition key={index} condition={collectablesForCategory.length > 0}>
              <MiscItemSubDropdown
                key={index}
                mainCategory={category}
                subCategory={subCategory}
                completed={completedMiscItems.toString()}
                total={collectablesForCategory.length.toString()}
              />
            </Condition>
          )
        })}
        <Condition condition={subCategories.length === 0 && getMiscItemsForCategory(category).length > 0}>
          <MiscItemMainList mainCategory={category} />
        </Condition>
      </CollectableSubDropdownContainer>
    </Dropdown>
  );
};

export default MiscMainDropdown;