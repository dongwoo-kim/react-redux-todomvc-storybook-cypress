import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearCompletedTodos } from '../actions';

function ClearCompletedButton({ hasCompleted, clearCompletedTodos }) {
  if (!hasCompleted) {
    return null;
  }
  return (
    <button className="clear-completed" onClick={clearCompletedTodos}>
      Clear completed
    </button>
  );
}

ClearCompletedButton.propTypes = {
  hasCompleted: PropTypes.bool.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hasCompleted: state.todos.some(todo => todo.completed)
});

export default connect(
  mapStateToProps,
  { clearCompletedTodos }
)(ClearCompletedButton);
