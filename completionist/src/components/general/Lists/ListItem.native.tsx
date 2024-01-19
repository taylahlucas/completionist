import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ListItemContainer, ListItemTitle, ListItemContentContainer, ListItemLocationContainer } from './ListStyledComponents.native';
import CheckBox from '../Checkbox/CheckBox.native';
import Condition from '../Condition.native';
import useGetLocationString from '@utils/hooks/useGetLocationString';
import StyledText from '../Text/StyledText.native';

interface ListItemProps {
  id: string;
  title: string;
  location?: string;
  hold?: string;
  isComplete?: boolean;
  action: () => void;
}

const ListItem = ({ title, location, hold, isComplete = false, action }: ListItemProps) => {
  const theme = useGetTheme();
  const locationString = useGetLocationString({ hold, location });

  return (
    <ListItemContainer color={isComplete ? theme.darkGrey : theme.midGrey}>
      <ListItemContentContainer>
        <ListItemTitle
          align={'left'}
          type={'ListItemSubTitle'}
          ellipsizeMode={'tail'}
          color={isComplete ? theme.midGrey : theme.lightestGrey}
        >
          {title}
        </ListItemTitle>
        <Condition condition={!!location || !!hold}>
          <ListItemLocationContainer>
            <StyledText 
              type={'ListItemSubDescription'} 
              color={isComplete ? theme.midGrey : theme.darkGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {locationString}
            </StyledText>
          </ListItemLocationContainer>
        </Condition>
      </ListItemContentContainer>
      <CheckBox isToggled={isComplete} action={action} />
    </ListItemContainer>
  );
};

export default ListItem;