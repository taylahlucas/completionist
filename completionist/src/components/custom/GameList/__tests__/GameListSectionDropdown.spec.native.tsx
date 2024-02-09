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

	// it('renders active games in the active section', () => {
  //   const initialState = {
  //     main: {
  //       ...mainState,
  //       user: userMock
  //     } 
  //   };
  //   const { queryByTestId } = render(<GameListSectionDropdown {...props} />, { initialState });
	// 	const test = queryByTestId('active-games')?.findByProps({ propName: 'data' })
  // });
});