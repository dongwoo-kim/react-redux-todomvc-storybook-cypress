import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {withRouter} from 'react-router';
import TodoItem from './TodoItem';
import {connect} from 'react-redux';
import {listFilters} from '../constants';
import {toggleAllTodos} from '../actions';

export function Main({todos, isCompletedAll, toggleAllTodos}) {
  return (
    <section className="main">
      <input
        type="checkbox"
        className="toggle-all"
        checked={isCompletedAll}
        onChange={toggleAllTodos}
      />
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  );
}

Main.propTypes = {
  todos: PropTypes.array.isRequired
};

function getFilteredTodos(todos, nowShowing) {
  switch (nowShowing) {
    case listFilters.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case listFilters.COMPLETED:
      return todos.filter(todo => todo.completed);
    case listFilters.ALL:
    default:
      return todos;
  }
}

const mapStateToProps = (state, ownProps) => {
  const {nowShowing = listFilters.ALL} = ownProps.match.params;
  const todos = getFilteredTodos(state.todos, nowShowing);
  const isCompletedAll = todos.every(todo => todo.completed);

  return {todos, isCompletedAll};
};

const mapDispatchToPorps = {toggleAllTodos};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToPorps
  )
)(Main);
