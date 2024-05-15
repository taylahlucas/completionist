import React from 'react';
import { render } from '@utils/TestLibraryUtils.native';
import { initialState as mainState } from '@redux/MainState';
import { userMockInitial } from '@utils/test-helper/__mocks__/mocks';
import GameListSectionDropdown from '../GameListSectionDropdown.native';

const props = {
	title: 'Active',
	data: userMockInitial.subscription.data
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
			data: userMockInitial.subscription.data
		};
    const { queryByTestId } = render(<GameListSectionDropdown {...inactiveProps} />, { initialState });

		expect(queryByTestId('fallout3')).toBeTruthy();
		expect(queryByTestId('witcher3')).toBeTruthy();
  });
});