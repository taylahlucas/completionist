import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  listStyles,
  ListItemHeaderContainer,
  ListItemHeaderCountTitle,
  SubListHeaderTitle
} from '@components/general/Lists/ListStyledComponents.native';
import Condition from '../Condition.native';

interface ListHeaderProps {
  title: string;
  enabled?: boolean;
  completed: string;
  total: string;
}

const ListHeader = ({ title, enabled = true, completed, total }: ListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={listStyles.selectableButton}>
      <ListItemHeaderContainer backgroundColor={theme.black} color={theme.darkGrey}>
        <SubListHeaderTitle
          type='ListItemSubTitleBold'
          align='left'
          color={theme.lightGrey}
        >
          {title}
        </SubListHeaderTitle>
        <Condition condition={enabled}>
          <ListItemHeaderCountTitle type='ListItemSubTitleBold'color={theme.lightGrey}>
            {`${completed} / ${total}`}
          </ListItemHeaderCountTitle>
        </Condition>
      </ListItemHeaderContainer>
    </View>
  );
};

export default ListHeader;