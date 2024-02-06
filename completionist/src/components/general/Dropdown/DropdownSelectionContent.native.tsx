import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { DropdownSelectionItemTitle, DropdownSelectionContentContainer, DropdownSelectionContentItem } from './DropdownStyledComponents.native';
import { GameKeyEnum } from '@utils/CustomEnums';

interface DropdownSelectionContentProps {
  content: GameKeyEnum[];
  onPress: (value: GameKeyEnum) => void;
}

const DropdownSelectionContent = ({ content, onPress }: DropdownSelectionContentProps) => {
  const theme = useGetTheme();
  
  return (
    <DropdownSelectionContentContainer>
      {content.map((content, index) => (
        <DropdownSelectionContentItem 
          key={index}
          last={index === content.length - 1}
          color={theme.darkGrey} 
          onPress={() => onPress(content)}
        >
          <DropdownSelectionItemTitle type={'ListItemSubTitleBold'} align={'left'}>{content}</DropdownSelectionItemTitle>
        </DropdownSelectionContentItem>
      ))}
    </DropdownSelectionContentContainer>
  );
};

export default DropdownSelectionContent;