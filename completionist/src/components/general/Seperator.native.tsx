import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { LARGE_WIDTH } from '@styles/global.native';

const Seperator = () => {
  const theme = useGetTheme();

  return (
    <View style={{
      height: 1,
      width: LARGE_WIDTH,
      marginTop: 8,
      marginBottom: 8,
      backgroundColor: theme.darkGrey
    }} />
  );
};

export default Seperator;