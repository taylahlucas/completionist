import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { DropdownSelectionItemTitle, DropdownSelectionContentContainer, DropdownSelectionContentItem } from './DropdownStyledComponents.native';
import { GameKeyEnum } from '@utils/CustomEnums';

interface DropdownSelectionProps {
  id: string;
  title: string;
}

interface DropdownSelectionContentProps {
  content: DropdownSelectionProps[];
  onPress: (value: string) => void;
}

const DropdownSelectionContent = ({ content, onPress }: DropdownSelectionContentProps) => {
  const theme = useGetTheme();
  
  return (
    <DropdownSelectionContentContainer bounces={false} contentContainerStyle={{ alignSelf: 'center',
		alignItems: 'center' }}>
      {content.map((item, index) => (
        <DropdownSelectionContentItem 
          key={index}
          last={index === content.length - 1}
          color={theme.darkGrey} 
          onPress={() => onPress(item.id)}
        >
          <DropdownSelectionItemTitle type={'ListItemSubTitleBold'} align='left'>{item.title}</DropdownSelectionItemTitle>
        </DropdownSelectionContentItem>
      ))}
    </DropdownSelectionContentContainer>
  );
};

export default DropdownSelectionContent;