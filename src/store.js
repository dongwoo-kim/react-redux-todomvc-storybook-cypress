import thunk from 'redux-thunk';
import reducer from './reducers';
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose
} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createStore(initialState) {
  return createReduxStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
