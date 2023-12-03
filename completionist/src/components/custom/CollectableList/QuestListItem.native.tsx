import React, { useState } from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import { CollectableListItemContainer, CollectableListItemTitle, CollectableListItemCheckBox } from './CollectableListStyledComponents.native'

interface CollectableListItemProps {
  name: string;
}

const CollectableListItem = ({ name }: CollectableListItemProps) => {
  const theme = useGetTheme();
  const [toggle, setToggle] = useState<boolean>(false);
  
  return (
    <CollectableListItemContainer color={theme.midGrey}>
      <CollectableListItemTitle 
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}

        color={theme.lightestGrey}
      >
        {name}
      </CollectableListItemTitle>
      <CollectableListItemCheckBox
        disabled={false}
        value={toggle}
        onValueChange={(): void => setToggle(!toggle)}
      />
    </CollectableListItemContainer>
  );
};

export default CollectableListItem;