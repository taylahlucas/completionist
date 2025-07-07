import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from './main-state';
import loginReducer from '@components/custom/login-form/provider/login-state';
import settingsReducer from '@features/settings/provider/settings-state';
import contentReducer from '@components/custom/content-list/provider/content-state';

export const reducers = {
  main: mainReducer,
  login: loginReducer,
  settings: settingsReducer,
  content: contentReducer,
};

const rootReducer = combineReducers({ ...reducers });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
