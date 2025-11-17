import React from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  RenderAPI,
} from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '@redux/reducer';
import { NavigationContainer } from '@react-navigation/native';

interface WrapperProps {
  children: any;
}

interface RenderHookProps {
  children: React.ReactNode;
  initialState?: any;
}

export const render = (
  ui: any,
  {
    initialState,
    store = configureStore({ reducer, preloadedState: initialState }),
    ...renderOptions
  }: any = {},
): RenderAPI => {
  const wrapper = ({ children }: WrapperProps): React.JSX.Element => {
    return (
      <NavigationContainer>
        <Provider store={store}>{children}</Provider>
      </NavigationContainer>
    );
  };
  return rtlRender(ui, { wrapper, ...renderOptions });
};

const ReusableRenderHook: React.FC<RenderHookProps> = ({
  children,
  initialState,
}) => {
  const store = configureStore({ reducer, preloadedState: initialState });

  return <Provider store={store}>{children}</Provider>;
};

export const renderHook = (
  hook: () => any,
  initialState: Record<string, any> = {},
) => {
  return rtlRenderHook(() => hook(), {
    wrapper: ({ children }) => (
      <ReusableRenderHook initialState={initialState}>
        {children}
      </ReusableRenderHook>
    ),
  });
};

export * from '@testing-library/react-native';
