import {todos} from '../../reducers';
import {ADD_TODO} from '../../actions';

it('should handle ADD_TODO', () => {
  const prevState = [
    {
      id: 1,
      text: 'Have a Breakfast',
      completed: true
    }
  ];

  const action = {
    type: ADD_TODO,
    text: 'Have a Lunch'
  };

  expect(todos(prevState, action)).toEqual([
    ...prevState,
    {
      id: 2,
      text: 'Have a Lunch',
      completed: false
    }
  ]);
});
