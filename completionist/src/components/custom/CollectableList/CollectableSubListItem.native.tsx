import React, { useState } from 'react';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import { CollectableListItemSubListHeader } from './CollectableListStyledComponents.native';
import CollectableSubTypeMainListItem from './CollectableSubTypeMainListItem.native';

export interface CollectableSubListItemProps {
  mainType: string;
  subType: string;
}

const CollectableSubListItem = ({ mainType, subType }: CollectableSubListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <CollectableListItemSubListHeader type={'ListItemSubTitleBold'} align={'left'}>{subType}</CollectableListItemSubListHeader>
      }
    >
      <CollectableSubTypeMainListItem mainType={mainType} subType={subType} isSubCategory={true} />
    </Dropdown>
  );
};

export default CollectableSubListItem;