import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';
import ClearCompletedButton from './ClearCompletedButton';
import { listFilters } from '../constants';

function Footer({ leftCount }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftCount}</strong>
        <span> items</span>
        <span> left</span>
      </span>
      <ul className="filters">
        <li>
          <FilterButton type={listFilters.ALL} />
        </li>
        <li>
          <FilterButton type={listFilters.ACTIVE} />
        </li>
        <li>
          <FilterButton type={listFilters.COMPLETED} />
        </li>
      </ul>
      <ClearCompletedButton />
    </footer>
  );
}

Footer.propTypes = {
  leftCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  leftCount: state.todos.filter(todo => !todo.completed).length
});

export default connect(mapStateToProps)(Footer);
