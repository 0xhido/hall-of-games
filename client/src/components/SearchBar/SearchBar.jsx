import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

import CardList from '../CardList/CardList';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      fullScreen: false,
      results: [],
    };

    document.addEventListener('mousedown', this.handleMouseClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleMouseClick, false);
  }

  handleMouseClick = e => {
    if (
      this.inputNode.contains(e.target) ||
      this.resultsNode.contains(e.target)
    ) {
      return;
    }
    this.setState({ fullScreen: false });
  };

  handleSearchKeyDown = key => {
    const { searchString } = this.state;
    const { maxResults } = this.props;

    if (key === 'Enter') {
      if (searchString === '') return this.setState({ results: [] });

      fetch(
        `https://api.rawg.io/api/games?search=${searchString}&page=1&page_size=${maxResults}`
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            results: data.results.map(game => ({
              id: game.id,
              name: game.name,
              image: game.background_image,
              rating: game.rating,
            })),
          })
        );
    } else if (key === 'Escape') {
      this.setState({ fullScreen: false });
    }
  };

  handleSearchStringChange = value => {
    this.setState({ searchString: value });
  };

  render() {
    const { placeholder, category, categories, onAddToCategory } = this.props;
    const { searchString, fullScreen, results } = this.state;

    return (
      <div className={`search__container${fullScreen ? '--full' : ''}`}>
        <h1 className="search__title">Search A Game: </h1>
        <input
          ref={node => (this.inputNode = node)}
          type="search"
          name="search__bar"
          id="search__bar"
          placeholder={placeholder}
          value={searchString}
          onChange={e => this.handleSearchStringChange(e.target.value)}
          onKeyDown={e => this.handleSearchKeyDown(e.key)}
          onFocus={() => this.setState({ fullScreen: true })}
        />
        <div
          className="search__results"
          ref={node => (this.resultsNode = node)}
        >
          <CardList
            cards={results}
            layout="grid"
            category={category}
            categories={categories}
            onAddToCategory={onAddToCategory}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  maxResults: PropTypes.number,
};
