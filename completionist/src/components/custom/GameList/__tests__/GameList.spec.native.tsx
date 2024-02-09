import React from 'react';
import { render, renderHook } from '@utils/TestLibraryUtils.native';
import { userMock } from '@utils/test-helper/mocks';
import GameList from '../GameList.native';
import { initialState as mainState } from '@redux/MainState';
import useFilterGameList from '../hooks/useFilterGameList.native';

describe('GameList', () => {
	const initialState = {
		main: {
			...mainState,
			user: userMock
		} 
	};

  afterEach(() => {
    jest.clearAllMocks();
  })
	
  it('renders active and inactive sections', () => {
    const { queryByTestId } = render(<GameList searchValue={''} />);
		expect(queryByTestId('active-games')).toBeTruthy();
		expect(queryByTestId('inactive-games')).toBeTruthy();
  });

	it('renders GameList with correct data for active games', async () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMock.subscription.data, true, '');

		expect(filteredData).toEqual([{ id: 'skyrim', isActive: true }])

		// TODO: See if we can test GameListSectionDropdown.data?

		// const { getByTestId } = render(<GameList searchValue={''} />, { initialState });
		// const test = expect(getByTestId('active-games'));

		// expect(test).toHaveProperty('data', filteredData);
  });

	it('renders GameList with correct data for inactive games', async () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMock.subscription.data, false, '');

		expect(filteredData).toEqual([{ id: 'fallout4', isActive: false }])
  });
});