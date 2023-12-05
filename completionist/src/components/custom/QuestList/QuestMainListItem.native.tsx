import React, { useState } from 'react';
import { getQuestSubCategories } from '../../../data/functions';
import Condition from '../../general/Condition.native';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import QuestSubListItem from './QuestSubListItem.native';
import QuestSubTypeMainListItem from './QuestSubTypeMainListItem.native';
import { QuestListSubListContainer } from './QuestListStyledComponents.native';
import ListHeader from '@components/general/Lists/ListHeader.native';
import useGetQuests from './hooks/useGetQuests.native';
import useMainState from 'src/redux/hooks/useMainState.native';

export interface QuestMainListItemProps {
  category: string;
  completed: string;
  total: string;
}

const QuestMainListItem = ({ category, completed, total }: QuestMainListItemProps) => {
  const { showSearchResults } = useMainState();
  const { getQuestsForSubCategory } = useGetQuests();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const subCategories = getQuestSubCategories(category);

  return (
    <Dropdown
      isOpen={showSearchResults || isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <ListHeader title={category} completed={completed} total={total} />
      }
    >
      <QuestListSubListContainer>
        {subCategories.map((subCategory, index) =>
          <Condition key={index} condition={getQuestsForSubCategory(subCategory).length > 0}>
            <QuestSubListItem key={index} category={subCategory} />
          </Condition>
        )}
        <Condition condition={subCategories.length === 0}>
          <QuestSubTypeMainListItem category={category} />
        </Condition>
      </QuestListSubListContainer>
    </Dropdown>
  );
};

export default QuestMainListItem;