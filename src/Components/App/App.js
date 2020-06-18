import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

let searchResults = [];

for (let i = 0; i < 5; i++) {
  let searchTrack = {
    name: `track${i}`,
    artist: `artist${i}`,
    album: `album${i}`,
    id: i,
  };

  searchResults.push(searchTrack);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: searchResults
    };
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
