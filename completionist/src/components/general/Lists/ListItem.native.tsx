import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ListItemContainer, ListItemTitle } from './ListStyledComponents.native';
import CheckBox from '../Checkbox/CheckBox.native';

interface ListItemProps {
  id: string;
  name: string;
  isComplete?: boolean;
  action: () => void;
}

const ListItem = ({ name, isComplete = false, action }: ListItemProps) => {
  const theme = useGetTheme();

  return (
    <ListItemContainer color={isComplete ? theme.darkGrey : theme.midGrey}>
      <ListItemTitle
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}
        color={isComplete ? theme.midGrey : theme.lightestGrey}
      >
        {name}
      </ListItemTitle>
      <CheckBox isToggled={isComplete} action={action} />
    </ListItemContainer>
  );
};

export default ListItem;