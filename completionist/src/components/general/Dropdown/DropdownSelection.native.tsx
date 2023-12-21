import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { DropdownSelectionContainer, DropdownSelectionInnerContainer, DropdownSelectionIconButton, DropdownSelectionTitle } from './DropdownStyledComponents.native';

interface DropdownSelectionProps {
  item: string;
  isSelected: boolean;
  onPress: () => void;
}

const DropdownSelection = ({ item, isSelected = false, onPress }: DropdownSelectionProps) => {
  const theme = useGetTheme();
  
  return (
    <DropdownSelectionContainer color={theme.darkGrey} onPress={onPress}>
      <DropdownSelectionInnerContainer>
        <DropdownSelectionTitle color={theme.lightGrey}>{item}</DropdownSelectionTitle>
        <DropdownSelectionIconButton 
          name={isSelected ? 'arrow-drop-down' : 'arrow-right'}
          onPress={onPress} 
          size={30} 
          color={theme.lightGrey} 
        />
      </DropdownSelectionInnerContainer>
    </DropdownSelectionContainer>
  );
};

export default DropdownSelection;