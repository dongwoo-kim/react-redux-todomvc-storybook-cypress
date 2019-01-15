import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './components/App';
import {BrowserRouter, Route} from 'react-router-dom';
import {resetTodos} from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:nowShowing?" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

store.dispatch(resetTodos());
