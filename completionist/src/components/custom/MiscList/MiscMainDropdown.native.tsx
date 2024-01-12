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

export interface MiscMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const MiscMainDropdown = ({ category, completed, total }: MiscMainDropdownProps) => {
  const { setSelectedCategory } = useMiscDispatch();
  const { selectedCategory } = useMiscState();
  const { getMiscItemsForCategory, updateMiscItemsComplete } = useGetMiscItems()
  const { checkMiscItemComplete } = useCheckMiscItemComplete();

  return (
    <Dropdown
      isOpen={category === selectedCategory.category}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        category: category === selectedCategory.category ? '' : category
      })}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      <ListItemScrollableList>
        {getMiscItemsForCategory(category).map((item: MiscItem, index: number) => (
          <ListItem 
            key={index}
            id={item.id}
            title={item.name}
            dlc={item.dlc}
            isComplete={checkMiscItemComplete(item.id)}
            action={(): void => updateMiscItemsComplete(item.id)}
          />
        ))}
      </ListItemScrollableList>
    </Dropdown>
  );
};

export default MiscMainDropdown;