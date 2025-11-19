import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer, { RootState } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const ignoredActions = [
  'persist/PERSIST',
  'persist/REHYDRATE',
  'persist/PURGE',
  'content/setGameContent',
];

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions,
        },
      }),
    ...preloadedState,
  });
}

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
