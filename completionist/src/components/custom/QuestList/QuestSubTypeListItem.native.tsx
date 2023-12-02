import React, { useState } from 'react';
import { getQuestsForSubCategory } from '../../../data/functions.native';
import { QuestListSubItemContainer } from './QuestListStyledComponents.native';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import Dropdown from '../../general/Dropdown/Dropdown.native';
import StyledText from '../../general/Text/StyledText.native';
import QuestListItem from './QuestListItem.native';

export interface QuestListSubItemTypeProps {
  category: string;
  type: string;
}

const QuestSubTypeListItem = ({ category, type }: QuestListSubItemTypeProps) => {
  const theme = useGetTheme();
  const [isOpen, setIsOpen] = useState(false);
  const quests = getQuestsForSubCategory(category, type === 'Main' ? '' : type);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      header={
        <StyledText align={'left'} type={'ListItemSubTitleBold'} color={theme.lightGrey} style={{ padding: 16, marginLeft: 32 }}>{type}</StyledText>
      }
    >
     <QuestListSubItemContainer>
      {quests?.map((quest, index) => (
        <QuestListItem 
          key={index}
          title={quest.title}
          location={quest.location}
          hold={quest.hold}
        />
      ))}
      </QuestListSubItemContainer> 
    </Dropdown>
  );
};

export default QuestSubTypeListItem;