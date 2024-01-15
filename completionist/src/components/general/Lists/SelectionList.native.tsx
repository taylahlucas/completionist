import React from 'react';
import SettingsContentCheckbox from '@components/custom/SettingsContent/SettingsContentCheckbox.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import StyledText from '../Text/StyledText.native';
import { SelectionListContainer, SelectionListItemContainer } from './ListStyledComponents.native';

interface SelectionListProps {
  data: SettingsListItem[];
}

const SelectionList = ({ data }: SelectionListProps) => {
  return (
    <SelectionListContainer>
      {data.map((item, index) => (
        <SelectionListItemContainer key={index}>
          <StyledText>{item.title}</StyledText>
          {/* // TODO: Add checkbox */}
        </SelectionListItemContainer>
      ))}
    </SelectionListContainer>
  );
};

export default SelectionList;