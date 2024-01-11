import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import CollectableMainList from './CollectableMainList.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useCollectableState from './hooks/useCollectableState';
import useCollectableDispatch from './hooks/useCollectableDispatch';

export interface CollectableSubDropdownProps {
  mainCategory: string;
  subCategory: string;
  completed: string;
  total: string;
}

const CollectableSubDropdown = ({ mainCategory, subCategory, completed, total }: CollectableSubDropdownProps) => {
  const { setSelectedCategory } = useCollectableDispatch();
  const { selectedCategory } = useCollectableState();

  return (
    <Dropdown
    isOpen={mainCategory === selectedCategory.category && subCategory === selectedCategory.subCategory}
      setOpen={() => setSelectedCategory({
        ...selectedCategory,
        subCategory: subCategory === selectedCategory.subCategory ? '' : subCategory
      })}
      header={
        <SubListHeader title={subCategory} completed={completed} total={total} />
      }
    >
      <CollectableMainList mainCategory={mainCategory} subCategory={subCategory} isSubCategory={true} />
    </Dropdown>
  );
};

export default CollectableSubDropdown;