import React from 'react';
import { SettingsListItem } from '@utils/CustomInterfaces';
import StyledText from '../Text/StyledText.native';
import { SelectionListContainer, SelectionListItemContainer } from './ListStyledComponents.native';
import CheckBox from '../Checkbox/CheckBox.native';

interface SelectionListProps {
  data: SettingsListItem[];
}

const SelectionList = ({ data }: SelectionListProps) => {
  // TODO: onPress
  return (
    <SelectionListContainer>
      {data.map((item, index) => (
        <SelectionListItemContainer key={index}>
          <StyledText>{item.title}</StyledText>
          <CheckBox 
            isActive={item.isActive}
            onPress={(): void => {}}
          />
        </SelectionListItemContainer>
      ))}
    </SelectionListContainer>
  );
};

export default SelectionList;