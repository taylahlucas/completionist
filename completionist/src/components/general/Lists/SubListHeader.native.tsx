import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import {
  listStyles,
  ListItemHeaderContainer,
  ListItemHeaderCountTitle,
  SubListHeaderTitle,
} from '@components/general/Lists/index';

interface SubListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

export const SubListHeader = ({
  title,
  completed,
  total,
}: SubListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={listStyles.subSelectableButton}>
      <ListItemHeaderContainer color={theme.darkGrey}>
        <SubListHeaderTitle align="left" color={theme.lightGrey}>
          {title}
        </SubListHeaderTitle>
        <ListItemHeaderCountTitle color={theme.lightGrey}>
          {`${completed} / ${total}`}
        </ListItemHeaderCountTitle>
      </ListItemHeaderContainer>
    </View>
  );
};
