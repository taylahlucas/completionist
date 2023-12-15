import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from './MainState';
import settingsReducer from '@components/custom/SettingsContent/SettingsState';

export const reducers = {
  main: mainReducer,
  settings: settingsReducer
}

const rootReducer = combineReducers({ ...reducers })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;