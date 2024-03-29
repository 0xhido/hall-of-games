import React from 'react';

import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import GamesSection from './components/GamesSection/GamesSection';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      games: [],
      onGoing: [],
      completed: [],
      favorites: [],
      categories: ['games', 'onGoing', 'completed', 'favorites'],
    };
  }

  componentDidMount() {
    fetch('https://api.rawg.io/api/games?page=1&page_size=10')
      .then(res => res.json())
      .then(data =>
        this.setState({
          games: data.results.map(game => ({
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
          })),
        })
      );
  }

  handleRemoveCard = (category, id) => {
    this.setState(prevState => ({
      [category]: prevState[category].filter(game => game.id !== id),
    }));
  };

  handleAddToCategory = (category, game) => {
    // eslint-disable-next-line
    const isExists = this.state[category].filter(g => g.id === game.id).length;
    if (!isExists) {
      this.setState(prevState => ({
        [category]: [game].concat(prevState[category]),
      }));
    }
  };

  render() {
    const { games, completed, favorites, onGoing, categories } = this.state;

    return (
      <div className="App">
        <SearchBar
          placeholder="search a game"
          maxResults={10}
          category="search"
          categories={categories}
          onRemoveCard={null}
          onAddToCategory={(category, card) =>
            this.handleAddToCategory(category, card)
          }
        />
        <div className="margin__top" />
        <GamesSection
          title="My Games"
          games={games}
          category="games"
          categories={categories}
          onRemoveCard={id => this.handleRemoveCard('games', id)}
          onAddToCategory={(category, id) =>
            this.handleAddToCategory(category, id)
          }
        />
        <GamesSection
          title="Currently Playing"
          games={onGoing}
          category="onGoing"
          categories={categories.filter(category => category !== 'onGoing')}
          onRemoveCard={id => this.handleRemoveCard('onGoing', id)}
          onAddToCategory={(category, id) =>
            this.handleAddToCategory(category, id)
          }
        />
        <GamesSection
          title="Completed"
          games={completed}
          category="completed"
          categories={categories.filter(category => category !== 'completed')}
          onRemoveCard={id => this.handleRemoveCard('completed', id)}
          onAddToCategory={(category, id) =>
            this.handleAddToCategory(category, id)
          }
        />
        <GamesSection
          title="Favorites"
          games={favorites}
          category="favorites"
          categories={categories.filter(category => category !== 'favorites')}
          onRemoveCard={id => this.handleRemoveCard('favorites', id)}
          onAddToCategory={(category, id) =>
            this.handleAddToCategory(category, id)
          }
        />
      </div>
    );
  }
}

export default App;
