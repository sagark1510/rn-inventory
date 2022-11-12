import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigator from './navigation/Navigator';
import {Provider} from 'react-redux';
import store, {persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
