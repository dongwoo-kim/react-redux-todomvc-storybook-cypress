import {combineReducers} from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  TOGGLE_ALL_TODOS,
  CLEAR_COMPLETED_TODOS,
  SET_EDITING,
  RESET_TODOS
} from './actions';

const initialState = {
  todos: [],
  editing: null
};

function addTodo(todos, text) {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);
  return [...todos, {id: maxId + 1, text, completed: false}];
}

function removeTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}

function toggleTodo(todos, id) {
  const idx = todos.findIndex(todo => todo.id === id);
  const todo = todos[idx];
  const newTodos = [...todos];
  newTodos[idx] = {...todo, completed: !todo.completed};

  return newTodos;
}

function updateTodo(todos, id, text) {
  const idx = todos.findIndex(todo => todo.id === id);
  const todo = todos[idx];
  const newTodos = [...todos];
  newTodos[idx] = {...todo, text};

  return newTodos;
}

function toggleAllTodos(todos) {
  const completed = !todos.every(todo => todo.completed);

  return todos.map(todo => ({...todo, completed}));
}

function clearCompletedTodos(todos) {
  return todos.filter(todo => !todo.completed);
}

export function todos(state = initialState.todos, action) {
  switch (action.type) {
    case RESET_TODOS:
      return action.todos;
    case ADD_TODO:
      return addTodo(state, action.text);
    case TOGGLE_TODO:
      return toggleTodo(state, action.id);
    case UPDATE_TODO:
      return updateTodo(state, action.id, action.text);
    case REMOVE_TODO:
      return removeTodo(state, action.id);
    case TOGGLE_ALL_TODOS:
      return toggleAllTodos(state);
    case CLEAR_COMPLETED_TODOS:
      return clearCompletedTodos(state);
    default:
      return state;
  }
}

export function editing(state = initialState.editing, action) {
  switch (action.type) {
    case SET_EDITING:
      return action.id;
    default:
      return state;
  }
}

export default combineReducers({
  todos,
  editing
});
