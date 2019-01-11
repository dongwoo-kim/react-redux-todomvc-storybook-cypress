import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './components/app';
import { BrowserRouter, Route } from 'react-router-dom';

const devtoolExt =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, devtoolExt);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:nowShowing?" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
