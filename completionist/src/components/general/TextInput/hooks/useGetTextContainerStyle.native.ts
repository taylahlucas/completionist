import { ViewStyle } from 'react-native';
import { DEFAULT_BORDER_RADIUS, windowWidth } from '@styles/global.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyleType } from '@utils/CustomTypes';

const useGetTextContainerStyle = (inputStyle: TextInputStyleType, width?: number): ViewStyle => {
  const theme = useGetTheme();

  switch (inputStyle) {
    case 'text':
      return {
        width: width ?? windowWidth - 64,
        borderBottomWidth: 2,
        borderBottomColor: theme.darkGrey
      };
		case 'verification':
			return {
				width: width ?? 40,
				height: 50,
				marginRight: 4,
				marginLeft: 4,
				borderRadius: DEFAULT_BORDER_RADIUS,
				backgroundColor: theme.darkGrey,
				alignItems: 'center'
			};
    default:
      return {
        backgroundColor: theme.darkGrey,
        borderRadius: DEFAULT_BORDER_RADIUS
      };
  }
};

export default useGetTextContainerStyle;