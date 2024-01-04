import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  listStyles,
  ListItemHeaderContainer,
  ListItemHeaderCountTitle, 
  SubListHeaderTitle
} from '@components/general/Lists/ListStyledComponents.native';

interface SubListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

const SubListHeader = ({ title, completed, total }: SubListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={listStyles.subSelectableButton}>
      <ListItemHeaderContainer color={theme.darkGrey}>
        <SubListHeaderTitle type={'ListItemSubTitle'} align={'left'} color={theme.lightGrey}>
          {title}
        </SubListHeaderTitle>
        <ListItemHeaderCountTitle type={'ListItemSubTitle'} color={theme.lightGrey}>
          {`${completed} / ${total}`}
        </ListItemHeaderCountTitle>
      </ListItemHeaderContainer>
    </View>
  );
};

export default SubListHeader;