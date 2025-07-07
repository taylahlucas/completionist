jest.mock('@redux/hooks', () => ({
  __esModule: true,
  useMainState: jest.fn(),
}));

import * as useMainState from '@redux/hooks';
import { initialState, MainState } from '@redux/main-state';

export const mockMainState = (initialProps?: MainState) =>
  jest.spyOn(useMainState, 'useMainState').mockReturnValue(
    initialProps
      ? {
          ...initialProps,
        }
      : { ...initialState },
  );
