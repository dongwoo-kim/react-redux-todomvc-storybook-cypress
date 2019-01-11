import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FilterButton({ type, isSelected }) {
  return (
    <Link
      disabled={isSelected}
      to={'/' + type}
      className={`filter-item ${isSelected ? 'selected' : ''}`}
    >
      {type}
    </Link>
  );
}

FilterButton.propTypes = {
  type: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    isSelected: state.nowShowing === ownProps.type
  };
};

export default connect(mapStateToProps)(FilterButton);
