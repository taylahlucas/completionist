import React from 'react';
import { GameSelection } from '../game-selection';
import {
  expectTestIDToMatch,
  expectTextToMatch,
  renderWithProvider,
} from '../../utils/testing/helpers';
import { mockUser } from '@utils/testing';
import { initialState } from '@redux/main-state';
import { screen } from '@testing-library/react-native';

describe('<GameSelection />', () => {
  const renderView = () =>
    renderWithProvider(<GameSelection />, {
      main: {
        ...initialState,
        user: mockUser,
      },
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header correctly', async () => {
    renderView();

    expectTestIDToMatch('game-selection');
    expectTextToMatch('Welcome\nTest User');
    expectTestIDToMatch('settings-button');
    expectTestIDToMatch('search-bar');
    expect(screen.queryByTestId('search-bar')?.props.placeholder).toBe(
      'Search items...',
    );
  });

  it('renders the game list', () => {
    renderView();
  });
});
