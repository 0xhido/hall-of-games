import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

import CardModal from '../CardModal/CardModal';

import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showSubMenu: false,
    };
  }

  render() {
    const { data, categories, onAddToCategory, onRemoveCard } = this.props;
    const { showModal, showSubMenu } = this.state;
    const categoryName = {
      onGoing: 'Currently Playing',
      completed: 'Completed',
      favorites: 'Favorites',
    };

    const concentModal = (
      <CardModal visible={showModal}>
        <span>Are you sure?</span>
        <button
          type="button"
          onClick={() => {
            this.setState({ showModal: false });
            return onRemoveCard(data.id);
          }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => this.setState({ showModal: false })}
        >
          No
        </button>
      </CardModal>
    );

    const addToModal = (
      <CardModal visible={showSubMenu}>
        <span>Add to:</span>
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => {
              this.setState({ showSubMenu: false });
              return onAddToCategory(category, data.id);
            }}
          >
            {categoryName[category]}
          </button>
        ))}
        <button
          type="button"
          onClick={() => this.setState({ showSubMenu: false })}
        >
          Back
        </button>
      </CardModal>
    );

    return (
      <div
        className="card"
        // onMouseLeave={() => this.setState({ showModal: false })} TODO delete?
      >
        {concentModal}
        {addToModal}
        <div className="card__info--hover">
          <ReactSVG
            className="card__action card__action--add"
            src={`${process.env.PUBLIC_URL}/add.svg`}
            onClick={() => this.setState({ showSubMenu: true })}
          />
          <ReactSVG
            className="card__action card__action--remove"
            src={`${process.env.PUBLIC_URL}/remove.svg`}
            onClick={() => this.setState({ showModal: true })}
          />
        </div>
        <div
          className="card__img"
          style={{ backgroundImage: `url(${data.image})` }}
        />

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="card__link">
          <div
            className="card__img--hover"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        </a>
        <div className="card__info">
          <h3 className="card__title">{data.name}</h3>
          <span className="card__rating">{data.rating}</span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  data: PropTypes.object,
  categories: PropTypes.array,
  onRemoveCard: PropTypes.func,
  onAddToCategory: PropTypes.func,
};

export default Card;
