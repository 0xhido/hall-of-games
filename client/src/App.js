import React from 'react';

import './App.css';
import GamesSection from './components/GamesSection/GamesSection';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      games: [],
      onGoing: [],
      completed: [],
      favorites: [],
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

  render() {
    const { games, completed, favorites, onGoing } = this.state;
    return (
      <div className="App">
        <GamesSection
          title="Currently Playing"
          games={onGoing}
          onRemoveCard={id => this.handleRemoveCard('onGoing', id)}
        />
        <GamesSection
          title="Completed"
          games={completed}
          onRemoveCard={id => this.handleRemoveCard('completed', id)}
        />
        <GamesSection
          title="Favorites"
          games={favorites}
          onRemoveCard={id => this.handleRemoveCard('favorites', id)}
        />
        <GamesSection
          title="My Games"
          games={games}
          onRemoveCard={id => this.handleRemoveCard('games', id)}
        />
      </div>
    );
  }
}

export default App;
