import React, { useState } from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import StyledText from '../../general/Text/StyledText.native';
import { LocationListItemContainer, LocationListItemCheckBox, LocationListItemTitle } from './LocationListStyledComponents.native';

interface LocationListItemProps {
  name: string;
}

const LocationListItem = ({ name }: LocationListItemProps) => {
  const theme = useGetTheme();
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <LocationListItemContainer color={theme.midGrey}>
      <LocationListItemTitle 
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}

        color={theme.lightestGrey}
      >
        {name}
      </LocationListItemTitle>
      <LocationListItemCheckBox
        disabled={false}
        value={toggle}
        onValueChange={(): void => setToggle(!toggle)}
      />
    </LocationListItemContainer>
  );
};

export default LocationListItem;