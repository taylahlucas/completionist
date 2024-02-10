import React from 'react';
import { render } from '@utils/TestLibraryUtils.native';
import { initialState as mainState } from '@redux/MainState';
import { userMock } from '@utils/test-helper/mocks';
import GameListSectionDropdown from '../GameListSectionDropdown.native';

describe('GameListSelectionDropdown', () => {
	const props = {
		title: 'Active',
		data: userMock.subscription.data
	};

  afterEach(() => {
    jest.clearAllMocks();
  })

	it('renders the correct game list items', () => {
    const initialState = {
      main: {
        ...mainState,
        user: userMock
      } 
    };
    const { queryByTestId } = render(<GameListSectionDropdown {...props} />, { initialState });

		expect(queryByTestId('skyrim')).toBeTruthy();
		expect(queryByTestId('fallout4')).toBeTruthy();
  });
});