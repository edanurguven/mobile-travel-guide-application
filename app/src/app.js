import React from 'react';
import Router from './router';
import {legacy_createStore} from 'redux';
import Provider from './context/provider';
import reducers from './context/reducers';
import store from './context/store';

export default App = () => {
  return (
    <Provider store={legacy_createStore(reducers, store)}>
      <Router />
    </Provider>
  );
};
