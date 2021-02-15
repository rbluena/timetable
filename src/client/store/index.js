import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import rootReducer from '../slices';

const logger = createLogger({
  timestamp: false,
  collapsed: true,
});

const isProduction = process.env.NODE_ENV !== 'development';

const middleware = !isProduction
  ? [logger, ...getDefaultMiddleware()]
  : [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [REGISTER],
        },
      }),
    ];

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    version: 0,
    whitelist: ['auth'],
  },
  rootReducer
);

function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
    preloadedState,
    devTools: !isProduction,
  });

  return store;
}

export default configureAppStore;
