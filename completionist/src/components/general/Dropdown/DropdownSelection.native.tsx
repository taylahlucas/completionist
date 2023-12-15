import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { DropdownSelectionContainer, DropdownSelectionContentContainer, DropdownSelectionIconButton, DropdownSelectionTitle } from './DropdownStyledComponents.native';

interface DropdownSelectionProps {
  item: string;
  isSelected: boolean;
  onPress: () => void;
}

const DropdownSelection = ({ item, isSelected = false, onPress }: DropdownSelectionProps) => {
  const theme = useGetTheme();
  
  return (
    <DropdownSelectionContainer color={theme.darkGrey} onPress={onPress}>
      <DropdownSelectionContentContainer>
        <DropdownSelectionTitle color={theme.lightGrey}>{item}</DropdownSelectionTitle>
        <DropdownSelectionIconButton 
          name={isSelected ? 'arrow-drop-down' : 'arrow-right'}
          onPress={onPress} 
          size={30} 
          color={theme.lightGrey} 
        />
      </DropdownSelectionContentContainer>
    </DropdownSelectionContainer>
  );
};

export default DropdownSelection;