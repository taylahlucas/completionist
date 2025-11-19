import React from 'react';
import { Provider } from 'react-redux';
import { RootState } from '@redux/index';
import { initialState as initialMainState } from '@redux/main-state';
import { initialState as initialAuthState } from '@redux/auth/auth-state';
import { initialState as initialSettingsState } from '@features/settings/provider';
import { initialState as initialContentState } from '@features/game-content/provider';
import rootReducer from '@redux/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';

const defaultPreloadedState: RootState = {
  auth: initialAuthState,
  main: initialMainState,
  settings: initialSettingsState,
  content: initialContentState,
};

export const createMockStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      ...defaultPreloadedState,
      ...preloadedState,
    },
  });

export const renderWithProvider = (
  children: React.ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  const store = createMockStore(preloadedState);
  return {
    ...render(<Provider store={store}>{children}</Provider>),
    store,
  };
};
