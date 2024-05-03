import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from './MainState';
import loginReducer from '@components/custom/LoginForm/LoginState';
import settingsReducer from '@components/custom/Settings/SettingsState';
import contentReducer from '@components/custom/ContentList/ContentState';
import subscriptionReducer from '@components/custom/SubscriptionContent/SubscriptionState';

export const reducers = {
  main: mainReducer,
  login: loginReducer,
  settings: settingsReducer,
  content: contentReducer,
  subscription: subscriptionReducer
}

const rootReducer = combineReducers({ ...reducers })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;