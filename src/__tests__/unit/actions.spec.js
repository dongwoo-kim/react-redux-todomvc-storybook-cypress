import axios from 'axios';
import {addTodo, ADD_TODO} from '../../actions';

it('Should dispatch ADD_TODO action and update Server data', () => {
  jest.spyOn(axios, 'put');
  const todos = [{id: 1}];
  const dispatch = jest.fn();

  const thunkAction = addTodo('Have a Lunch');
  thunkAction(dispatch, () => ({todos}));

  expect(dispatch).toHaveBeenCalledWith({
    type: ADD_TODO,
    text: 'Have a Lunch'
  });
  expect(axios.put).toHaveBeenCalledWith('/todos', todos);
});
