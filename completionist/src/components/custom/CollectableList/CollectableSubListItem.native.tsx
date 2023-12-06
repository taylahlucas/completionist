import React, { useState } from 'react';
import useMainState from '@redux/hooks/useMainState';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import CollectableSubTypeMainListItem from './CollectableSubTypeMainListItem.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';

export interface CollectableSubListItemProps {
  mainType: string;
  subType: string;
  completed: string;
  total: string;
}

const CollectableSubListItem = ({ mainType, subType, completed, total }: CollectableSubListItemProps) => {
  const { showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dropdown
      isOpen={isOpen || showSearchResults}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <SubListHeader title={subType} completed={completed} total={total} />
      }
    >
      <CollectableSubTypeMainListItem mainType={mainType} subType={subType} isSubCategory={true} />
    </Dropdown>
  );
};

export default CollectableSubListItem;