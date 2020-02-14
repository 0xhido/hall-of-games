import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import CardsLayout from '../CardsLayout/CardsLayout';

import './CardList.css';

function CardList({
  cards,
  layout,
  category,
  categories,
  onRemoveCard,
  onAddToCategory,
}) {
  console.log('cards', cards);

  return (
    <CardsLayout layout={layout}>
      {cards.map(card => (
        <Card
          key={`${category}-${card.id}`}
          data={card}
          categories={categories}
          onRemoveCard={onRemoveCard}
          onAddToCategory={onAddToCategory}
        />
      ))}
    </CardsLayout>
  );
}

CardList.propTypes = {
  cards: PropTypes.array,
  layout: PropTypes.string,
  category: PropTypes.string,
  categories: PropTypes.array,
  onRemoveCard: PropTypes.func,
  onAddToCategory: PropTypes.func,
};

export default CardList;
