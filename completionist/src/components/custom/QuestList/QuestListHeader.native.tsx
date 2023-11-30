import { Text, View } from 'react-native';
import listStyles from '../../general/Lists/ListStyles.native';

interface QuestListHeaderProps {
  title: string;
}

const QuestListHeader = ({ title }: QuestListHeaderProps): JSX.Element => {
  return (
    <View style={{ ...listStyles.selectableButton, backgroundColor: 'lightblue' }}>
      <Text style={{ marginLeft: 16 }}>{title}</Text>
    </View>
  );
};

export default QuestListHeader;