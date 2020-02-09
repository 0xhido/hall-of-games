import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

function Card({ data }) {
  return (
    <div className="game__card">
      <div className="game__card--img">
        <div style={{ backgroundImage: `url(${data.background_image})` }} />
      </div>
      <div className="game__card--details">
        <h1>{data.name}</h1>
        <p>{data.rating}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
