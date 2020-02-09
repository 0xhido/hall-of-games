import React from 'react';

import './App.css';
import GamesSection from './components/GamesSection/GamesSection';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    fetch('https://api.rawg.io/api/games?page=1&page_size=10')
      .then(res => res.json())
      .then(data => this.setState({ games: data.results }));
  }

  render() {
    const { games } = this.state;
    return (
      <div className="App">
        <GamesSection title="Favorite Games" games={games} />
        <GamesSection title="Done" games={games} />
      </div>
    );
  }
}

export default App;
