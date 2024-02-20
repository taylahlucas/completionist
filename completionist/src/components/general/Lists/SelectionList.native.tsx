import React from 'react';
import { SelectionListContainer, SelectionListItemContainer, SelectListTitle } from './ListStyledComponents.native';
import CheckBox from '../Checkbox/CheckBox.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SettingsListItem } from '@utils/CustomInterfaces';

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
          <SelectListTitle align='left' color={theme.lightGrey}>{item.title}</SelectListTitle>
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