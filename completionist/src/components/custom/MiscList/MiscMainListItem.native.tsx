import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';
import useGetMiscItems from './hooks/useGetMiscItems';
import ListItem from '@components/general/Lists/ListItem.native';
import { MiscItem } from '@utils/CustomInterfaces';

export interface MiscMainListItemProps {
  category: string;
  completed: string;
  total: string;
}

const MiscMainListItem = ({ category, completed, total }: MiscMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getMiscItemsForCategory } = useGetMiscItems();

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      <StyledText style={{ backgroundColor: 'blue' }}>{category}</StyledText>
      {getMiscItemsForCategory(category)?.map((item: MiscItem, index: number) => (
        <ListItem 
          key={index}
          id={item.id}
          name={item.name}
          isComplete={false}
          action={(): void => {}}
        />
      ))}
    </Dropdown>
  );
};

export default MiscMainListItem;