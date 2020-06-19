import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

let searchResults = [];
let playlistTracks = [];

for (let i = 0; i < 8; i++) {
  let searchTrack = {
    name: `Track #${i}`,
    artist: `Artist #${i}`,
    album: `Album #${i}`,
    id: i,
  };

  searchResults.push(searchTrack);
}

for (let i = 0; i < 4; i++) {
  let playlistTrack = {
    name: `Track #${i}`,
    artist: `Artist #${i}`,
    album: `Album #${i}`,
    id: i,
  };

  playlistTracks.push(playlistTrack);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: searchResults,
      playlistName: "Newer Playlist",
      playlistTracks: playlistTracks,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    var playlist = this.state.playlistTracks;
    if (playlist.filter((e) => e.id === track.id).length === 0) {
      playlist.push(track);
    }
    this.setState({ playlistTracks: playlist });
  }

  removeTrack(track) {
    var playlist = this.state.playlistTracks;
    playlist = playlist.filter((e) => e.id !== track.id);
    this.setState({ playlistTracks: playlist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
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
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
