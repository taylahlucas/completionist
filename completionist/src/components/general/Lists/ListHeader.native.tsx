import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import listStyles from '@components/general/Lists/ListStyles.native';
import StyledText from '@components/general/Text/StyledText.native';

interface ListHeaderProps {
  title: string;
}

const ListHeader = ({ title }: ListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <View style={{ ...listStyles.selectableButton, backgroundColor: theme.darkGrey }}>
      <StyledText type={'ListItemSubTitle'} color={theme.lightGrey} style={{ marginLeft: 16 }}>{title}</StyledText>
    </View>
  );
};

export default ListHeader;