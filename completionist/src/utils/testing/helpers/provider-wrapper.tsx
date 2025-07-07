import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, setupStore } from '@redux/store';
import { render, RenderOptions } from '@testing-library/react-native';
import { RootState } from '@redux/reducer';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProvider = (
  children: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(children, { wrapper: Wrapper, ...renderOptions }),
  };
};
