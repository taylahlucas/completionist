import {
  ContentState,
  initialState as initialContentState,
} from '@features/game-content/provider';
import * as useContentState from '@features/game-content/provider';
import * as useMainState from '@redux/hooks/use-main-state';
import { MainState, initialState as initialMainState } from '@redux/main-state';

export const mockUseMainState = (stateOverride?: Partial<MainState>) => {
  jest
    .spyOn(useMainState, 'useMainState')
    .mockReturnValue({ ...initialMainState, ...stateOverride });
};

export const mockUseContentState = (stateOverride?: Partial<ContentState>) => {
  jest
    .spyOn(useContentState, 'useContentState')
    .mockReturnValue({ ...initialContentState, ...stateOverride });
};
