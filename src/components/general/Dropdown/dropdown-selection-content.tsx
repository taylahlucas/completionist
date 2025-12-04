import React from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import {
  DropdownSelectionItemTitle,
  DropdownSelectionContentItem,
} from './dropdown-styled-components';
import { ScrollableList } from '..';

interface DropdownSelectionProps {
  id: string;
  title: string;
}

interface DropdownSelectionContentProps {
  content: DropdownSelectionProps[];
  onPress: (value: string) => void;
}

export const DropdownSelectionContent = ({
  content,
  onPress,
}: DropdownSelectionContentProps) => {
  const theme = useGetTheme();

  return (
    <ScrollableList bounces={false} style={{ maxHeight: content.length * 45 }}>
      {content.map((item, index) => (
        <DropdownSelectionContentItem
          key={index}
          last={index === content.length - 1}
          color={theme.darkGrey}
          onPress={() => onPress(item.id)}>
          <DropdownSelectionItemTitle type="ListItemSubTitleBold" align="left">
            {item.title}
          </DropdownSelectionItemTitle>
        </DropdownSelectionContentItem>
      ))}
    </ScrollableList>
  );
};
