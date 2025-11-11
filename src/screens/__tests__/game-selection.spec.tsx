import React from 'react';
import { GameSelection } from '../game-selection';
import {
  expectTestIDToBeNull,
  expectTestIDToMatch,
  expectTextToMatch,
  renderWithProvider,
} from '../../utils/testing/helpers';
import { mockUser, navigationSpy } from '@utils/testing';
import { initialState, MainState } from '@redux/main-state';
import { screen, userEvent } from '@testing-library/react-native';
import { AuthScreenEnum, GameKeyEnum } from '@utils/custom-enums';

const inactiveGames = [
  GameKeyEnum.FALLOUT_3,
  GameKeyEnum.FALLOUT_4,
  GameKeyEnum.WITCHER_3,
];
const activeGames = mockUser.gameData.map(item => item.id);

const defaultProps = {
  ...initialState,
  user: mockUser,
};

describe('<GameSelection />', () => {
  const renderView = (props?: MainState) =>
    renderWithProvider(<GameSelection />, {
      main: props ?? defaultProps,
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderView();

    expectTestIDToMatch('game-selection');
    expectTextToMatch('Welcome\nTest User');
    expectTestIDToMatch('settings-button');
    expectTestIDToMatch('search-bar');
    expect(screen.queryByTestId('search-bar')?.props.placeholder).toBe(
      'Search items...',
    );
    expectTestIDToMatch('active-games');
    expectTextToMatch('ACTIVE');
    expectTestIDToMatch('inactive-games');
    expectTextToMatch('INACTIVE');
  });

  it('renders the correct inactive games', async () => {
    renderView();

    activeGames.forEach(item => {
      expectTestIDToMatch(`game-list-item-${item}`);
    });

    await userEvent.press(
      screen.getByTestId('dropdown-pressable-active-games'),
    );

    activeGames.forEach(item => {
      expectTestIDToBeNull(`game-list-item-${item}`);
    });

    inactiveGames.forEach(item => {
      expectTestIDToMatch(`game-list-item-${item}`);
    });
  });

  it('renders the correct active games', async () => {
    renderView();

    inactiveGames.forEach(item => {
      expectTestIDToMatch(`game-list-item-${item}`);
    });

    await userEvent.press(
      screen.getByTestId('dropdown-pressable-inactive-games'),
    );

    activeGames.forEach(item => {
      expectTestIDToMatch(`game-list-item-${item}`);
    });

    inactiveGames.forEach(item => {
      expectTestIDToBeNull(`game-list-item-${item}`);
    });
  });

  it('navigates to global settings on settings button press', async () => {
    const navigationMock = jest.fn();
    navigationSpy({
      navigate: navigationMock,
    });
    renderView();

    const settingsButton = screen.getByTestId('settings-button');
    await userEvent.press(settingsButton);

    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith(AuthScreenEnum.GlobalSettings);
  });
});
