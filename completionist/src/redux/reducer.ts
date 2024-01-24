import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from './MainState';
import loginReducer from '@components/custom/LoginForm/LoginState';
import settingsReducer from '@components/custom/SettingsContent/SettingsState';
import questReducer from '@components/custom/QuestList/QuestState';
import collectableReducer from '@components/custom/CollectableList/CollectableState';
import locationReducer from '@components/custom/LocationList/LocationState';
import miscReducer from '@components/custom/MiscList/MiscState';
import contentReducer from '@components/custom/ContentList/ContentState';

export const reducers = {
  main: mainReducer,
  login: loginReducer,
  settings: settingsReducer,
  content: contentReducer,
  // TOOD: Remove?
  quest: questReducer,
  collectable: collectableReducer,
  location: locationReducer,
  misc: miscReducer
}

const rootReducer = combineReducers({ ...reducers })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;