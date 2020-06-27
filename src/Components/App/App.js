import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";
import UserPlaylists from "../UserPlaylists/UserPlaylists";
import Spotify from "../../util/Spotify";

let searchResults = [];
let playlistTracks = [];
let userPlaylists = [];
let userId = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: searchResults,
      playlistName: "New Playlist",
      playlistTracks: playlistTracks,
      userPlaylists: userPlaylists,
      userId: userId,
    };
    this.connect = this.connect.bind(this);
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  connect() {
    let userId = Spotify.getUserId();
    userId.then((userId) => this.setState({ userId: userId }));
    let userPlaylists = Spotify.getUserPlaylists();
    userPlaylists.then((playlist) => this.setState({ userPlaylist: playlist }));
  }

  search(searchTerm) {
    this.connect();
    let results = Spotify.search(searchTerm);
    results.then((tracks) => this.setState({ searchResults: tracks }));
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
    trackURIs = this.state.playlistTracks.map((e) => e.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>
      this.setState({ playlistName: "New Playlist", playlistTracks: [] })
    );
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
            <UserPlaylists
              onConnect={this.connect}
              userPlaylists={this.state.userPlaylists}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
