import { todos } from '../../reducers';
import { ADD_TODO } from '../../actions';

it('should handle ADD_TODO', () => {
  const prevState = [
    {
      id: 1,
      text: 'Have Breakfast',
      completed: true
    }
  ];

  const action = {
    type: ADD_TODO,
    text: 'Have Lunch'
  };

  expect(todos(prevState, action)).toEqual([
    ...prevState,
    {
      id: 2,
      text: 'Have Lunch',
      completed: false
    }
  ]);
});
