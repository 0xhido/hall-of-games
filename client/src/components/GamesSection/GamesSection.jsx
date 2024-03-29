import React, { Component } from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';

import CardList from '../CardList/CardList';
import FilterBox from '../FilterBox/FilterBox';

import './GamesSection.css';

export default class GamesSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      layout: 'row',
    };
  }

  render() {
    const {
      title,
      games,
      category,
      categories,
      onRemoveCard,
      onAddToCategory,
    } = this.props;
    const { filterText, layout } = this.state;

    const filteredGames = games.filter(game =>
      game.name
        ? game.name.toLowerCase().includes(filterText.toLowerCase())
        : true
    );

    return (
      <div className="game__section">
        <div className="game__section--top">
          <div className="game__section--title">
            <h1>{title}</h1>
          </div>
          <div className="game__section--actions">
            <FilterBox
              placeholder="Filter"
              handleChange={e => this.setState({ filterText: e.target.value })}
            />
            <ReactSVG
              className={`icon__layout icon__layout--${layout}`}
              src={`${process.env.PUBLIC_URL}/layout.svg`}
              onClick={() =>
                this.setState(state =>
                  state.layout === 'row'
                    ? { layout: 'grid' }
                    : { layout: 'row' }
                )
              }
            />
          </div>
        </div>
        <div className="game__section--cards">
          {filteredGames.length ? (
            <CardList
              cards={filteredGames}
              category={category}
              categories={categories}
              layout={layout}
              onRemoveCard={onRemoveCard}
              onAddToCategory={onAddToCategory}
            />
          ) : (
            <p>No games found.</p>
          )}
        </div>
      </div>
    );
  }
}

GamesSection.propTypes = {
  title: PropTypes.string,
  games: PropTypes.array,
  category: PropTypes.string,
  categories: PropTypes.array,
  onAddToCategory: PropTypes.func,
  onRemoveCard: PropTypes.func,
};
