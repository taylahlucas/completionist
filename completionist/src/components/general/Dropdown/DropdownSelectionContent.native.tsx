import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { style, DropdownSelectionContentScrollContainer, DropdownSelectionContentItem } from './DropdownStyledComponents.native';
import StyledText from '../Text/StyledText.native';

interface DropdownSelectionContentProps {
  content: string[];
  onPress: (value: string) => void;
}

const DropdownSelectionContent = ({ content, onPress }: DropdownSelectionContentProps) => {
  const theme = useGetTheme();
  
  return (
    <DropdownSelectionContentScrollContainer
      contentContainerStyle={style.scrollContent}
    >
      {content.map((content, index) => (
        <DropdownSelectionContentItem 
          key={index}
          last={index === content.length - 1}
          color={theme.darkGrey} 
          onPress={() => onPress(content)}
        >
          <StyledText align={'left'}>{content}</StyledText>
        </DropdownSelectionContentItem>
      ))}
    </DropdownSelectionContentScrollContainer>
  );
};

export default DropdownSelectionContent;