import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';

configure({adapter: new Adapter()});

it('Header', () => {
  const addTodo = jest.fn();
  const wrapper = shallow(<Header addTodo={addTodo} />);
  const todoText = 'Have a Coffee';

  const input = wrapper.find('input');
  input.simulate('change', {target: {value: todoText}});
  input.simulate('keydown', {keyCode: 13});

  expect(addTodo).toBeCalledWith(todoText);
});
