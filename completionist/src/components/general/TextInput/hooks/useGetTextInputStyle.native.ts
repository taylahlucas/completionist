import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyleType } from '@utils/CustomTypes';

const useGetTextInputStyle = (inputStyle: TextInputStyleType, hasLeftComponent: boolean) => {
  const theme = useGetTheme();

  switch (inputStyle) {
		case 'verification':
			return {};
    default:
      return {
        marginLeft: hasLeftComponent ? 50 : 16,
				marginRight: 48,
      };
  }
};

export default useGetTextInputStyle;