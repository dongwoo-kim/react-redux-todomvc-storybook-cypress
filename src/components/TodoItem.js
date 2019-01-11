import React from 'react';
import PropTypes from 'prop-types';
import { keyCodes } from '../constants';
import { connect } from 'react-redux';
import {
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
  setEditing
} from '../actions';

export class TodoItem extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    setEditing: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    const { isEditing } = this.props;

    if (isEditing) {
      const textLength = this.input.value.length;

      this.input.focus();
      this.input.setSelectionRange(textLength, textLength);
    }
  }

  save() {
    const { updateTodo, todo, setEditing } = this.props;
    const text = this.input.value.trim();

    if (text) {
      updateTodo(todo.id, text);
    }
    setEditing(null);
  }

  onKeyDown(ev) {
    switch (ev.keyCode) {
      case keyCodes.ENTER:
        this.save();
        break;
      case keyCodes.ESCAPE:
        this.props.setEditing(null);
        break;
      default:
        return;
    }
  }

  render() {
    const { todo, toggleTodo, setEditing, removeTodo, isEditing } = this.props;
    const { id, text, completed } = todo;
    const liClassName = `${completed ? 'completed' : ''} ${
      isEditing ? 'editing' : ''
    }`;

    return (
      <li className={liClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => toggleTodo(id)}
          />
          <label onDoubleClick={() => setEditing(id)}>{text}</label>
          <button className="destroy" onClick={() => removeTodo(id)} />
        </div>
        <input
          className="edit"
          defaultValue={text}
          onKeyDown={ev => this.onKeyDown(ev)}
          onBlur={() => this.save()}
          ref={input => (this.input = input)}
        />
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isEditing: ownProps.todo.id === state.editing
});

const mapDispatchToProps = {
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
  setEditing
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
