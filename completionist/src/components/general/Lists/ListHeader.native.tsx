import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  listStyles, 
  ListItemHeaderContainer,
  ListItemHeaderCountTitle,
  SubListHeaderTitle
} from '@components/general/Lists/ListStyledComponents.native';

interface ListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

const ListHeader = ({ title, completed, total }: ListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={listStyles.selectableButton}>
      <ListItemHeaderContainer color={theme.darkGrey}>
        <SubListHeaderTitle type={'ListItemSubTitleBold'} color={theme.lightGrey}>{title}</SubListHeaderTitle>
        <ListItemHeaderCountTitle type={'ListItemSubTitleBold'} color={theme.lightGrey}>
          {`${completed} / ${total}`}
        </ListItemHeaderCountTitle>
      </ListItemHeaderContainer>
    </View>
  );
};

export default ListHeader;