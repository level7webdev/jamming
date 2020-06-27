import React from "react";
import "./UserPlaylists.css";
// import TrackList from "../TrackList/TrackList";

class UserPlaylists extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleNameChange = this.handleNameChange.bind(this);
  // }

  // handleNameChange(e) {
  //   this.props.onNameChange(e.target.value);
  // }

  render() {
    return (
      <div className="UserPlaylists">
        <h2>User Playlists</h2>
        {/* <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        /> */}
        <button className="Spotify-connect" onClick={this.props.onConnect}>
          CONNECT SPOTIFY
        </button>
      </div>
    );
  }
}

export default UserPlaylists;
