import { TextInputStyleType } from '@utils/index';

export const useGetTextInputStyle = (
  inputStyle: TextInputStyleType,
  hasLeftComponent: boolean,
) => {
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
