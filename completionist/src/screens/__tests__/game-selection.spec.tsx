import React from 'react';
import { GameSelection } from '../game-selection';
import { mockMainState, renderWithProvider } from '../../utils/testing/helpers';
import { initialState } from '../../redux/main-state';
import { useMainState } from '../../redux/hooks';
import { initialState as initialLoginState } from '../../components/custom/login-form/provider';
import { initialState as initialSettingsState } from '../../features/settings/provider';
import { initialState as initialContentState } from '../../features/game-content/provider';

// TODO: Fix here
describe('<GameSelection />', () => {
  // beforeEach(() => {
  //   mockMainState();
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { queryByTestId } = renderWithProvider(<GameSelection />, {
      preloadedState: {
        main: { ...initialState },
        login: { ...initialLoginState },
        settings: { ...initialSettingsState },
        content: { ...initialContentState },
      },
    });

    queryByTestId('GameSelection');
  });
});
