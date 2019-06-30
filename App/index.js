import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from './Navigation';
import { store, persistor } from './Store';
import Loading from './Containers/Loading';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;
