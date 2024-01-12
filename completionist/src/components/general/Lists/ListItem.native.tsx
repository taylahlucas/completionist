import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ListItemContainer, ListItemTitle, ListItemDLCTitle, ListItemContentContainer, ListItemLocationContainer } from './ListStyledComponents.native';
import CheckBox from '../Checkbox/CheckBox.native';
import Condition from '../Condition.native';
import StyledText from '../Text/StyledText.native';
import useGetLocationString from '@utils/hooks/useGetLocationString';

interface ListItemProps {
  id: string;
  title: string;
  dlc?: string;
  location?: string;
  hold?: string;
  isComplete?: boolean;
  action: () => void;
}

const ListItem = ({ title, dlc = 'None', location, hold, isComplete = false, action }: ListItemProps) => {
  const theme = useGetTheme();
  const hasDLC = dlc !== 'None';
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
        <Condition condition={hasDLC}>
          <ListItemDLCTitle
            type={'ListItemSubDescriptionBold'}
            color={isComplete ? theme.midGrey : theme.darkGrey}
            ellipsizeMode={'tail'}
            align={'left'}
            numberOfLines={1}
          >
            {dlc.toLocaleUpperCase()}
          </ListItemDLCTitle>
        </Condition>
        <Condition condition={!!location || !!hold}>
          <ListItemLocationContainer>
            <ListItemDLCTitle 
              type={'ListItemSubDescriptionBold'} 
              color={isComplete ? theme.midGrey : theme.darkGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {locationString}
            </ListItemDLCTitle>
          </ListItemLocationContainer>
        </Condition>
      </ListItemContentContainer>
      <CheckBox isToggled={isComplete} action={action} />
    </ListItemContainer>
  );
};

export default ListItem;