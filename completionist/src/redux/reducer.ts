import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from './MainState';
import loginReducer from '@components/custom/LoginForm/LoginState';
import settingsReducer from '@components/custom/SettingsContent/SettingsState';

export const reducers = {
  main: mainReducer,
  login: loginReducer,
  settings: settingsReducer
}

const rootReducer = combineReducers({ ...reducers })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;