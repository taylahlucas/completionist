import React, { useState } from 'react';
import { Text } from 'react-native';
import { getQuestSubCategoriesTypes } from '../../../data/functions.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestSubTypeListItem from './QuestSubTypeListItem.native';

export interface QuestSubListItemProps {
  category: string;
}

const QuestSubListItem = ({ category }: QuestSubListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const subCategoryTypes = getQuestSubCategoriesTypes(category);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <Text style={{ color: 'blue', padding: 8 }}>{category}</Text>
      }
    >
      {/* <Condition condition={mainQuests?.length > 0}>
        <QuestSubTypeListItem category={category} type={'Main'} />
      </Condition> */}
      <QuestSubTypeListItem category={category} type={'Main'} />
      {subCategoryTypes?.map((type, index) => {
        return (
          <QuestSubTypeListItem category={category} type={type} />
        )
      })}
    </Dropdown>
  );
};

export default QuestSubListItem;