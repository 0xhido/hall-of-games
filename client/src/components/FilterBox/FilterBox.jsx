import React from 'react';
import PropTypes from 'prop-types';

import './FilterBox.css';

function FilterBox({ placeholder, handleChange }) {
  return (
    <div className="filter__box">
      <input
        className="filter__box--input"
        type="filter"
        name="filter"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

FilterBox.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

export default FilterBox;
