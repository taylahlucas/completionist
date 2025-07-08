import React from 'react';
import { GameSelection } from '../game-selection';
import {
  mockUseMainState,
  renderWithProvider,
} from '../../utils/testing/helpers';
import { mockUser } from '@utils/testing';
import { initialState } from '@redux/main-state';

describe('<GameSelection />', () => {
  // beforeEach(() => {
  //   mockUseMainState();
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { queryByTestId, queryByText } = renderWithProvider(
      <GameSelection />,
      {
        main: {
          ...initialState,
          user: mockUser,
        },
      },
    );
    expect(queryByTestId('game-selection')).toBeTruthy();
    // const title = queryByTestId('navigation-header-title');
    // console.log('HERE: ', title);
    expect(queryByText('Welcome\nTest User')).toBeTruthy();
  });

  // it('renders the game list', () => {});
});
