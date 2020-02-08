import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import CardsLayout from '../CardsLayout/CardsLayout';

import './CardList.css';

function CardList({ cards, layout }) {
  return (
    <CardsLayout layout={layout}>
      {cards.map(card => (
        <Card key={card.id} data={card} />
      ))}
    </CardsLayout>
  );
}

CardList.propTypes = {
  cards: PropTypes.array,
  layout: PropTypes.string
};

export default CardList;
