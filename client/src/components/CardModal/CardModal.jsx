import React from 'react';
import PropTypes from 'prop-types';

import './CardModal.css';

function CardModal({ visible, children }) {
  return visible ? <div className="card__modal">{children}</div> : null;
}

CardModal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default CardModal;
