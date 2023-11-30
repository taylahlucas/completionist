import React, { useState } from 'react';
import { QuestListItemContainer, QuestListItemLocationContainer, QuestListItemTitle, QuestListItemSubtitle, QuestListItemCheckBox } from './QuestListStyledComponents.native';

interface QuestListItemProps {
  title: string;
  location?: string;
  hold?: string;
  customStyle?: any;
}

const QuestListItem = ({ title, location, hold, customStyle }: QuestListItemProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  
  return (
    <QuestListItemContainer style={customStyle}>
      <QuestListItemCheckBox
        disabled={false}
        value={toggle}
        onValueChange={(): void => setToggle(!toggle)}
      />
      <QuestListItemTitle>{title}</QuestListItemTitle>
      <QuestListItemLocationContainer>
        <QuestListItemSubtitle>{hold}</QuestListItemSubtitle>
        <QuestListItemSubtitle>{location}</QuestListItemSubtitle>
      </QuestListItemLocationContainer>
    </QuestListItemContainer>
  );
};

export default QuestListItem;