import React from 'react';
import {Provider} from 'react-redux';
import {legacy_createStore} from 'redux';

import store from './store';
import reducers from './reducers';

const UserProvider = ({children}) => {
  const stores = legacy_createStore(reducers, store);
  return <Provider store={stores}>{children}</Provider>;
};

export default UserProvider;
