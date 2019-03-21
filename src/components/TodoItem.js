import React from 'react';
import PropTypes from 'prop-types';
import {keyCodes} from '../constants';
import {connect} from 'react-redux';
import {
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
  setEditing
} from '../actions';

export class TodoItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    setEditing: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    const {editing} = this.props;

    if (editing) {
      const textLength = this.input.value.length;

      this.input.focus();
      this.input.setSelectionRange(textLength, textLength);
    }
  }

  save() {
    const {updateTodo, id, setEditing} = this.props;
    const text = this.input.value.trim();

    if (text) {
      updateTodo(id, text);
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
    const {
      id,
      text,
      completed,
      toggleTodo,
      setEditing,
      removeTodo,
      editing
    } = this.props;
    const liClassName = `${completed ? 'completed' : ''} ${
      editing ? 'editing' : ''
    }`;

    return (
      <li className={liClassName} data-testid="todo-item">
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
  editing: ownProps.id === state.editing
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
