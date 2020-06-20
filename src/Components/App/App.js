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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: searchResults,
      playlistName: "Newer Playlist",
      playlistTracks: playlistTracks,
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(searchTerm) {
    console.log(searchTerm);
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

  savePlaylist() {
    var trackURIs = [];
    trackURIs = this.state.playlistTracks.map((e) => e.id);
    this.setState({ trackURIs: trackURIs });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
