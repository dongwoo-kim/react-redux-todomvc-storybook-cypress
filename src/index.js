import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from './store';
import App from './components/App';
import {BrowserRouter, Route} from 'react-router-dom';
import {resetTodos} from './actions';

const store = createStore({});
store.dispatch(resetTodos());

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:nowShowing?" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
