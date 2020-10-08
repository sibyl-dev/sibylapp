import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import dashBoardReducers from '../reducers';
import { api } from './middlewares';

import { loadState, saveState } from '../../components/Header/localStorage';

const persistedState = loadState();

const loggerMiddleware = createLogger({
  collapsed: true,
});
let middleWares = [thunkMiddleWare, api, loggerMiddleware];

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  middleWares = [thunkMiddleWare, api];
}

export function configureStore(initialState = {}) {
  return createStore(
    dashBoardReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares)),
    persistedState,
  );
}

const store = configureStore();

store.subscribe(
  throttle(() => {
    saveState({
      cases: store.getState().cases,
    });
  }, 1000),
);

export default store;
