import { AnyAction, combineReducers, UnknownAction } from '@reduxjs/toolkit';
import mainReducer from '@redux/main-state';
import loginReducer from '@features/login/provider/login-state';
import settingsReducer from '@features/settings/provider/settings-state';
import contentReducer from '@features/game-content/provider/content-state';

export const reducers = {
  main: mainReducer,
  login: loginReducer,
  settings: settingsReducer,
  content: contentReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
