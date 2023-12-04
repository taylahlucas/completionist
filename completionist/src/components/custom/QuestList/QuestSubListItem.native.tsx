import React, { useState, useEffect } from 'react';
import { getQuestSubCategoriesTypes } from '../../../data/functions';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestSubTypeListItem from './QuestSubTypeListItem.native';
import { QuestListItemSubListHeader } from './QuestListStyledComponents.native';
import Condition from '@components/general/Condition.native';
import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';
import useMainState from 'src/redux/hooks/useMainState.native';

export interface QuestSubListItemProps {
  category: string;
}

const QuestSubListItem = ({ category }: QuestSubListItemProps) => {
  const { searchValue, showSearchResults } = useMainState();
  const [isOpen, setIsOpen] = useState(searchValue.length >= 3);
  const subCategoryTypes = getQuestSubCategoriesTypes(category);
  
  return (
    <Dropdown
      isOpen={showSearchResults || isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <QuestListItemSubListHeader type={'ListItemSubTitleBold'} align={'left'}>{category}</QuestListItemSubListHeader>
      }
    >
      <Condition 
        condition={subCategoryTypes?.length === 0}
        conditionalElement={<QuestSubTypeListItem category={category} type={'Main'} />}
      >
        <QuestSubTypeMainListItem category={category} isSubCategory={true} />
      </Condition>

      {subCategoryTypes?.map((type) => {
        return (
          <QuestSubTypeListItem category={category} type={type} />
        )
      })}
    </Dropdown>
  );
};

export default QuestSubListItem;