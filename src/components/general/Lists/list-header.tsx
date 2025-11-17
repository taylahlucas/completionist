import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import {
  Condition,
  listStyles,
  ListItemHeaderContainer,
  ListItemHeaderCountTitle,
  SubListHeaderTitle,
} from '@components/general';

interface ListHeaderProps {
  title: string;
  enabled?: boolean;
  completed: string;
  total: string;
}

export const ListHeader = ({
  title,
  enabled = true,
  completed,
  total,
}: ListHeaderProps): React.JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={listStyles.selectableButton}>
      <ListItemHeaderContainer
        backgroundColor={theme.black}
        color={theme.darkGrey}>
        <SubListHeaderTitle
          type="ListItemSubTitleBold"
          align="left"
          color={theme.lightGrey}>
          {title}
        </SubListHeaderTitle>
        <Condition condition={enabled}>
          <ListItemHeaderCountTitle
            type="ListItemSubTitleBold"
            color={theme.lightGrey}>
            {`${completed} / ${total}`}
          </ListItemHeaderCountTitle>
        </Condition>
      </ListItemHeaderContainer>
    </View>
  );
};
