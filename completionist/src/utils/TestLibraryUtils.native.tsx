import React from 'react';
import { render as rtlRender, RenderAPI } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from '@redux/reducer';
import { NavigationContainer } from '@react-navigation/native';

interface WrapperProps {
  children: any;
}
export const render = (
  ui: any,
  { initialState, store = configureStore({ reducer, preloadedState: initialState }), ...renderOptions }: any = {}
): RenderAPI => {
  const wrapper = ({ children }: WrapperProps): JSX.Element => {
    return (
			<NavigationContainer>
      	<Provider store={store}>{children}</Provider>
			</NavigationContainer>
    );
  };
  return rtlRender(ui, { wrapper, ...renderOptions });
};

export * from '@testing-library/react-native';
