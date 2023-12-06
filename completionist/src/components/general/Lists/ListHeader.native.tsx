import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  listStyles, 
  ListItemHeaderContainer,
  ListItemHeaderCountTitle 
} from '@components/general/Lists/ListStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';

interface ListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

const ListHeader = ({ title, completed, total }: ListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={{ ...listStyles.selectableButton, backgroundColor: theme.darkGrey, flexDirection: 'row' }}>
      <ListItemHeaderContainer>
        <StyledText type={'ListItemSubTitle'} color={theme.lightGrey} style={{ marginLeft: 16 }}>{title}</StyledText>
        <ListItemHeaderCountTitle type={'ListItemSubTitle'} color={theme.lightGrey}>
          {`${completed} / ${total}`}
        </ListItemHeaderCountTitle>
      </ListItemHeaderContainer>
    </View>
  );
};

export default ListHeader;