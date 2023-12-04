import React, { useState } from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import StyledText from '../Text/StyledText.native';
import { ListItemContainer, ListItemCheckBox, ListItemTitle } from './ListStyledComponents.native';

interface ListItemProps {
  name: string;
}

const ListItem = ({ name }: ListItemProps) => {
  const theme = useGetTheme();
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <ListItemContainer color={theme.midGrey}>
      <ListItemTitle
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}
        color={theme.lightestGrey}
      >
        {name}
      </ListItemTitle>
      <ListItemCheckBox
        disabled={false}
        value={toggle}
        onValueChange={(): void => setToggle(!toggle)}
      />
    </ListItemContainer>
  );
};

export default ListItem;