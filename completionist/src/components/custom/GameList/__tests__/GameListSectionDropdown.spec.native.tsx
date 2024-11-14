import React from 'react';
import { render } from '@utils/testing/TestLibraryUtils.native';
import { initialState as mainState } from '@redux/MainState';
import { userMockInitial } from '@utils/testing/test-helper/__mocks__/mocks';
import GameListSectionDropdown from '../GameListSectionDropdown.native';

const props = {
	title: 'Active',
	type: 'active',
	// TODO: Replace with activeGames
	data: []
};
const initialState = {
	main: {
		...mainState,
		user: userMockInitial
	} 
};

describe('GameListSelectionDropdown', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

	it('renders the correct active game list items', () => {
    const { queryByTestId } = render(<GameListSectionDropdown {...props} />, { initialState });

		expect(queryByTestId('fallout4')).toBeTruthy();
		expect(queryByTestId('skyrim')).toBeTruthy();
  });

	it('renders the correct inactive game list items', () => {
		const inactiveProps = {
			title: 'Inactive',
			// TODO: Replace with activeGames
			data: []
		};
    const { queryByTestId } = render(<GameListSectionDropdown {...inactiveProps} />, { initialState });

		expect(queryByTestId('fallout3')).toBeTruthy();
		expect(queryByTestId('witcher3')).toBeTruthy();
  });
});