import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';
import ClearCompletedButton from './ClearCompletedButton';
import { listFilters } from '../constants';

const { ALL, ACTIVE, COMPLETED } = listFilters;

class Footer extends React.PureComponent {
  render() {
    const { leftCount } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{leftCount}</strong>
          <span> items</span>
          <span> left</span>
        </span>
        <ul className="filters">
          {[ALL, ACTIVE, COMPLETED].map(type => this.renderFilterButton(type))}
        </ul>
        <ClearCompletedButton />
      </footer>
    );
  }

  renderFilterButton(type) {
    const { nowShowing = listFilters.ALL } = this.props.match.params;
    const isSelected = type === nowShowing;

    return (
      <li key={type}>
        <FilterButton type={type} isSelected={isSelected} />
      </li>
    );
  }
}

Footer.propTypes = {
  leftCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  leftCount: state.todos.filter(todo => !todo.completed).length
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Footer);
