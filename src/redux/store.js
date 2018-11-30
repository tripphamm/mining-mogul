/* eslint-disable no-underscore-dangle */ // allow dangling underscore in var name because we have no control over it

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from 'redux/reducer';

const persistConfig = {
  key: 'mining-mogul-state', // todo: add version to key for cache-busting
  storage,
  blacklist: [ // do not persist
    'coinCount',
    'availableUpgrades', // available upgrades have functions attached to them
    'ownedUpgrades',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

let _store;
export function getStore() {
  if (_store === undefined) {
    _store = createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk),
    );
  }

  return _store;
}

export const persistor = persistStore(getStore());
