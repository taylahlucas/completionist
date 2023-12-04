import React, { useState } from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import Condition from '../../general/Condition.native';
import StyledText from '../../general/Text/StyledText.native';
import { QuestListItemContainer, QuestListItemLocationContainer, QuestListItemTitle, QuestListItemCheckBox, QuestListItemContentContainer } from './QuestListStyledComponents.native';

interface QuestListItemProps {
  title: string;
  location?: string;
  hold?: string;
  customStyle?: any;
}

const QuestListItem = ({ title, location, hold, customStyle }: QuestListItemProps) => {
  const theme = useGetTheme();
  const [toggle, setToggle] = useState<boolean>(false);
  const locationString = `${location?.toLocaleUpperCase() ?? ''} - ${hold?.toLocaleUpperCase() ?? ''}`
  
  return (
    <QuestListItemContainer style={customStyle} color={theme.midGrey}>
      <QuestListItemContentContainer>
        <QuestListItemTitle 
          align={'left'} 
          type={'ListItemSubTitle'} 
          color={theme.lightestGrey}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >{title}</QuestListItemTitle>
        <Condition condition={!!location || !!hold}>
          <QuestListItemLocationContainer>
            <StyledText 
              type={'ListItemSubDescription'} 
              color={theme.darkGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {locationString}
            </StyledText>
          </QuestListItemLocationContainer>
        </Condition>
      </QuestListItemContentContainer>
      <QuestListItemCheckBox
        disabled={false}
        value={toggle}
        onValueChange={(): void => setToggle(!toggle)}
      />
    </QuestListItemContainer>
  );
};

export default QuestListItem;