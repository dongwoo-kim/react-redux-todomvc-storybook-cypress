export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
export const SET_FILTER = 'SET_FILTER';
export const SET_EDITING = 'SET_EDITING';

export function addTodo(text) {
  return {type: ADD_TODO, text};
}

export function toggleTodo(id) {
  return {type: TOGGLE_TODO, id};
}

export function removeTodo(id) {
  return {type: REMOVE_TODO, id};
}

export function updateTodo(id, text) {
  return {type: UPDATE_TODO, id, text};
}

export function toggleAllTodos() {
  return {type: TOGGLE_ALL_TODOS};
}

export function clearCompletedTodos() {
  return {type: CLEAR_COMPLETED_TODOS};
}

export function setFilter(filter) {
  return {type: SET_FILTER, filter};
}

export function setEditing(id) {
  return {type: SET_EDITING, id};
}
