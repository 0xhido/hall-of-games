import React from 'react';
import PropTypes from 'prop-types';

import './CardsLayout.css';

function CardsLayout({ children, layout }) {
  return <div className={`cards__layout--${layout}`}>{children}</div>;
}

CardsLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  layout: PropTypes.string,
};

export default CardsLayout;
