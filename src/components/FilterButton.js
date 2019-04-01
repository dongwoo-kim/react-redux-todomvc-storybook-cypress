import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FilterButton({ type, isSelected }) {
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
