import useGetTheme from '@styles/hooks/use-get-theme';
import { TextInputStyleType } from '@utils/custom-types';

export const useGetTextInputStyle = (
  inputStyle: TextInputStyleType,
  hasLeftComponent: boolean,
) => {
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
