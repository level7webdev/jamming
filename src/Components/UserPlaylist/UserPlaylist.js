import React from "react";
import "./UserPlaylist.css";

class UserPlaylist extends React.Component {
  render() {
    const playlistName = this.props.playlist.name;

    return (
      <div className="UserPlaylist">
        <div className="UserPlaylist-information">
          <h3>{playlistName}</h3>
          {/* <p>
            artistName | albumName
          </p> */}
        </div>
        <button className="UserPlaylist-action">&lt;&lt;</button>
      </div>
    );
  }
}

export default UserPlaylist;
