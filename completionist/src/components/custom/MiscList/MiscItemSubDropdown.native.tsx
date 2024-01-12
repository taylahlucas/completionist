import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import MiscItemMainList from './MiscItemMainList.native';
import SubListHeader from '@components/general/Lists/SubListHeader.native';
import useMiscItemState from './hooks/useMiscState';
import useMiscItemDispatch from './hooks/useMiscDispatch';

export interface MiscItemSubDropdownProps {
  mainCategory: string;
  subCategory: string;
  completed: string;
  total: string;
}

const MiscItemSubDropdown = ({ mainCategory, subCategory, completed, total }: MiscItemSubDropdownProps) => {
  const { setSelectedCategory } = useMiscItemDispatch();
  const { selectedCategory } = useMiscItemState();

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
      <MiscItemMainList mainCategory={mainCategory} subCategory={subCategory} isSubCategory={true} />
    </Dropdown>
  );
};

export default MiscItemSubDropdown;