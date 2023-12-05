import CheckBox from '@components/general/Checkbox/CheckBox.native';
import React, { useState } from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import Condition from '../../general/Condition.native';
import StyledText from '../../general/Text/StyledText.native';
import useGetLocationString from './hooks/useGetLocationString.native';
import { QuestListItemContainer, QuestListItemLocationContainer, QuestListItemTitle, QuestListItemContentContainer } from './QuestListStyledComponents.native';

interface QuestListItemProps {
  title: string;
  location?: string;
  hold?: string;
  customStyle?: any;
}

const QuestListItem = ({ title, location, hold, customStyle }: QuestListItemProps) => {
  const theme = useGetTheme();
  const [toggled, setToggled] = useState<boolean>(false);
  const locationString = useGetLocationString({ hold, location });
  
  return (
    <QuestListItemContainer style={customStyle} color={toggled ? theme.darkGrey : theme.midGrey}>
      <QuestListItemContentContainer>
        <QuestListItemTitle 
          align={'left'} 
          type={'ListItemSubTitle'} 
          color={toggled ? theme.midGrey : theme.lightestGrey}
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
      <CheckBox toggled={toggled} setToggled={setToggled} action={() => null} />
    </QuestListItemContainer>
  );
};

export default QuestListItem;