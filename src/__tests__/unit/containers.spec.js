jest.mock('../../actions', () => ({
  addTodo: jest.fn().mockReturnValue({type: 'ADD_TODO'})
}));

import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';
import {addTodo} from '../../actions';

configure({adapter: new Adapter()});

const mockStore = configureStore([thunk]);

it('Header', () => {
  const store = mockStore({});
  const component = shallow(<Header store={store} />).first();
  const todoText = 'Hava a Coffee';

  component.prop('addTodo')(todoText);

  expect(addTodo).toBeCalledWith(todoText);
});
