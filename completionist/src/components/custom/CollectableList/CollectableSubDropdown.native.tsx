import React, { useState } from 'react';
import useMainState from '@redux/hooks/useMainState';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import CollectableMainList from './CollectableMainList.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';

export interface CollectableSubDropdownProps {
  mainCategory: string;
  subType: string;
  completed: string;
  total: string;
}

const CollectableSubDropdown = ({ mainCategory, subType, completed, total }: CollectableSubDropdownProps) => {
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
      <CollectableMainList mainCategory={mainCategory} subType={subType} isSubCategory={true} />
    </Dropdown>
  );
};

export default CollectableSubDropdown;