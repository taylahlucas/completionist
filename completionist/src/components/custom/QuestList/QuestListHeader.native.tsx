import { Text, View } from 'react-native';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import listStyles from '../../general/Lists/ListStyles.native';
import StyledText from '../../general/Text/StyledText.native';

interface QuestListHeaderProps {
  title: string;
}

const QuestListHeader = ({ title }: QuestListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={{ ...listStyles.selectableButton, backgroundColor: theme.darkGrey }}>
      <StyledText type={'ListItemSubTitle'} color={theme.lightGrey} style={{ marginLeft: 16 }}>{title}</StyledText>
    </View>
  );
};

export default QuestListHeader;