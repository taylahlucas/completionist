import store, { persistor } from './store';

export const resetStore = () => {
  store.dispatch({ type: 'RESET' });
  persistor.purge();
};
