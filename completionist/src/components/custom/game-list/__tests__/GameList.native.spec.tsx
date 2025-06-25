import React from 'react';
import { render } from '@utils/testing/TestLibraryUtils.native';
import GameList from '../game-list';

describe('GameList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the game list', () => {
    const { queryByTestId } = render(<GameList searchValue={''} />);
    expect(queryByTestId('scrollable-list')).toBeTruthy();
  });

  it('renders active and inactive sections', () => {
    const { queryByTestId } = render(<GameList searchValue={''} />);
    expect(queryByTestId('active-games')).toBeTruthy();
    expect(queryByTestId('inactive-games')).toBeTruthy();
  });
});
