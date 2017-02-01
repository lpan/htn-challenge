import 'babel-polyfill'; // eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './Routes';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(Routes);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Routes', () => {
    render(Routes);
  });
}
