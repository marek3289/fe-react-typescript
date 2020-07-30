import { Store as ReduxStore, combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import { root } from '../reducers';

interface Store {}

const sagaMiddleware = createSagaMiddleware();

const store: ReduxStore<Store> = createStore(
  root,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

if (module.hot !== undefined) {
  module.hot.accept(() => {
    const nextRootReducer = combineReducers<Store>({ ...require('../reducers/root').default });
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
