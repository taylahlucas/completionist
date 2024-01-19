import { Dimensions } from 'react-native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyleType } from '@utils/CustomTypes';

const useGetTextInputStyle = (inputStyle: TextInputStyleType) => {
  const theme = useGetTheme();

  switch (inputStyle) {
    case 'text':
      return {
        width: Dimensions.get('window').width - 64,
        borderBottomWidth: 2,
        borderBottomColor: theme.darkGrey
      }
    default:
      return {
        backgroundColor: theme.darkGrey,
        borderRadius: DEFAULT_BORDER_RADIUS
      }
  }
};

export default useGetTextInputStyle;