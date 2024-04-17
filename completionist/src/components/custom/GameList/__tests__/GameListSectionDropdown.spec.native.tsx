import React from 'react';
import { render } from '@utils/TestLibraryUtils.native';
import { initialState as mainState } from '@redux/MainState';
import { userMockInitial } from '@utils/test-helper/__mocks__/mocks';
import GameListSectionDropdown from '../GameListSectionDropdown.native';

describe('GameListSelectionDropdown', () => {
	const props = {
		title: 'Active',
		data: userMockInitial.subscription.data
	};

  afterEach(() => {
    jest.clearAllMocks();
  });

	it('renders the correct game list items', () => {
    const initialState = {
      main: {
        ...mainState,
        user: userMockInitial
      } 
    };
    const { queryByTestId } = render(<GameListSectionDropdown {...props} />, { initialState });

		expect(queryByTestId('fallout4')).toBeTruthy();
		expect(queryByTestId('skyrim')).toBeTruthy();
		expect(queryByTestId('witcher3')).toBeTruthy();
  });
});