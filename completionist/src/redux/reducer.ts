import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from './MainState';
import loginReducer from '@components/custom/LoginForm/provider/LoginState';
import settingsReducer from '@components/custom/Settings/provider/SettingsState';
import contentReducer from '@components/custom/ContentList/provider/ContentState';
import subscriptionReducer from '@components/custom/SubscriptionContent/provider/SubscriptionState';

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