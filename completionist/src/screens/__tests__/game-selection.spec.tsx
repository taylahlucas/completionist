import React from 'react';
import { GameSelection } from '../game-selection';
import {
  expectTestIdToMatch,
  expectTextToMatch,
  mockUseMainState,
  renderWithProvider,
} from '../../utils/testing/helpers';
import { mockUser } from '@utils/testing';
import { initialState } from '@redux/main-state';

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

  it('renders the header correctly', () => {
    renderView();

    expectTestIdToMatch('game-selection');
    expectTextToMatch('Welcome\nTest User');
    expectTestIdToMatch('settings-button');
  });

  it('renders the game list', () => {
    renderView();
  });
});
