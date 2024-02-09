import React from 'react';
import 'jest-styled-components'; 
import { render } from '@utils/TestLibraryUtils.native';
// import { initialState as mainState } from '@redux/MainState';
import GameList from '../GameList.native';

describe('CurrencyTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

	// TODO: Check how Styled Components jest works on web-core
  it('renders the active games', () => {
    // const initialState = {
    //   main: {
    //     ...mainState,
    //     currencyData: mockCurrencyData,
    //     filteredCurrencyData: mockCurrencyData,
    //     filterOptions: null
    //   } 
    // };
		//{ initialState }
    const { queryByTestId } = render(<GameList searchValue={''} />);
		expect(queryByTestId('active-games')).toBeTruthy();
		expect(queryByTestId('inactive-games')).toBeTruthy();
  });
});