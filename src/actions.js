import axios from 'axios';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
export const SET_EDITING = 'SET_EDITING';
export const RESET_TODOS = 'RESET_TODOS';

function dispatchWithSync(action) {
  return (dispatch, getState) => {
    dispatch(action);
    axios.put('/todos', getState().todos);
  };
}

export function addTodo(text) {
  return dispatchWithSync({ type: ADD_TODO, text });
}

export function toggleTodo(id) {
  return dispatchWithSync({ type: TOGGLE_TODO, id });
}

export function removeTodo(id) {
  return dispatchWithSync({ type: REMOVE_TODO, id });
}

export function updateTodo(id, text) {
  return dispatchWithSync({ type: UPDATE_TODO, id, text });
}

export function toggleAllTodos() {
  return dispatchWithSync({ type: TOGGLE_ALL_TODOS });
}

export function clearCompletedTodos() {
  return dispatchWithSync({ type: CLEAR_COMPLETED_TODOS });
}

export function setEditing(id) {
  return dispatchWithSync({ type: SET_EDITING, id });
}

export function resetTodos() {
  return async (dispatch, getState) => {
    const { data: todos } = await axios.get('/todos');

    dispatch({ type: RESET_TODOS, todos });
  };
}
