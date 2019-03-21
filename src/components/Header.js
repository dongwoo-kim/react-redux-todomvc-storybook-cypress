import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {keyCodes} from '../constants';
import {addTodo} from '../actions';

export class Header extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  state = {text: ''};

  onKeyDown(ev) {
    if (ev.keyCode === keyCodes.ENTER) {
      const text = this.state.text.trim();

      if (text) {
        this.props.addTodo(text);
        this.setState({text: ''});
      }
    }
  }

  onChange(ev) {
    this.setState({
      text: ev.target.value
    });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          data-testid="todo-input"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.text}
          onKeyDown={ev => this.onKeyDown(ev)}
          onChange={ev => this.onChange(ev)}
        />
      </header>
    );
  }
}

export default connect(
  null,
  {addTodo}
)(Header);
