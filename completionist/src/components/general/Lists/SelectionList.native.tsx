import React from 'react';
import { SettingsListItem } from '@utils/CustomInterfaces';
import StyledText from '../Text/StyledText.native';
import { SelectionListContainer, SelectionListItemContainer } from './ListStyledComponents.native';
import CheckBox from '../Checkbox/CheckBox.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface SelectionListProps {
  data: SettingsListItem[];
  onPress: (title: string) => void;
}

const SelectionList = ({ data, onPress }: SelectionListProps) => {
  const theme = useGetTheme();

  return (
    <SelectionListContainer>
      {data.map((item, index) => (
        <SelectionListItemContainer key={index}>
          <StyledText color={theme.lightGrey}>{item.title}</StyledText>
          <CheckBox 
            isActive={item.isActive}
            onPress={(): void => onPress(item.id)}
          />
        </SelectionListItemContainer>
      ))}
    </SelectionListContainer>
  );
};

export default SelectionList;