import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { listFilters } from '../constants';
import { toggleAllTodos } from '../actions';

function Main({ todos, toggleAllTodos }) {
  return (
    <section className="main">
      <input type="checkbox" className="toggle-all" onClick={toggleAllTodos} />
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
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
  return { todos: getFilteredTodos(state.todos, state.nowShowing) };
};

const mapDispatchToPorps = { toggleAllTodos };

export default connect(
  mapStateToProps,
  mapDispatchToPorps
)(Main);
