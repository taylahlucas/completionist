import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useMainState from '@redux/hooks/useMainState';
import useGetMiscItems from './hooks/useGetMiscItems';
import ListItem from '@components/general/Lists/ListItem.native';
import { MiscItem } from '@utils/CustomInterfaces';
import useCheckMiscItemComplete from './hooks/useCheckMiscItemComplete';

export interface MiscMainDropdownProps {
  category: string;
  completed: string;
  total: string;
}

const MiscMainDropdown = ({ category, completed, total }: MiscMainDropdownProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getMiscItemsForCategory, updateMiscItemsComplete } = useGetMiscItems()
  const { checkMiscItemComplete } = useCheckMiscItemComplete();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      {getMiscItemsForCategory(category).map((item: MiscItem, index: number) => (
        <ListItem 
          key={index}
          id={item.id}
          name={item.name}
          isComplete={checkMiscItemComplete(item.id)}
          action={(): void => updateMiscItemsComplete(item.id)}
        />
      ))}
    </Dropdown>
  );
};

export default MiscMainDropdown;