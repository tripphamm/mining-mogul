import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'reset-css';
import { setConfiguration as setGridConfiguration } from 'react-grid-system';

import { responsiveWidthBreakpoints } from 'settings/theme';

import registerServiceWorker from 'registerServiceWorker';
import { getStore, persistor } from 'redux/store';
import Router from 'Router';

setGridConfiguration({ gutterWidth: 0, breakpoints: responsiveWidthBreakpoints });

ReactDOM.render(
  <Provider store={getStore()}>
    <PersistGate loader={<div>Loading...</div>} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>, document.getElementById('root'),
);
registerServiceWorker();
