/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { applyMiddleware, createStore, compose } from 'redux';
// import { persistReducer, REGISTER } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger({
  timestamp: false,
  collapsed: true,
});

const isProduction = process.env.NODE_ENV !== 'development';

export default function configureStore(preloadedState) {
  const middlewares = isProduction
    ? [thunkMiddleware]
    : [
        require('redux-immutable-state-invariant').default(),
        loggerMiddleware,
        thunkMiddleware,
      ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = !isProduction
    ? composeWithDevTools(...enhancers)
    : compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
