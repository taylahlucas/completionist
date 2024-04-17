import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  ListItemHeaderContainer,
  ListItemHeaderCountTitle,
  SubListHeaderTitle,
  listStyles
} from '@components/general/Lists/ListStyledComponents.native';

interface SubTypeListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

const SubTypeListHeader = ({ title, completed, total }: SubTypeListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={listStyles.subTypeSelectableButton}>
      <ListItemHeaderContainer color={theme.darkGrey}>
        <SubListHeaderTitle type='ListItemSubTitleItalic' color={theme.lightGrey} align='left'>
          {title}
        </SubListHeaderTitle>
        <ListItemHeaderCountTitle type='ListItemSubTitleItalic' color={theme.lightGrey}>
          {`${completed} / ${total}`}
        </ListItemHeaderCountTitle>
      </ListItemHeaderContainer>
    </View>
  );
};

export default SubTypeListHeader;