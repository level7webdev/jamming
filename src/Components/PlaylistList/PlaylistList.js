import React from "react";
import "./PlaylistList.css";
import UserPlaylist from "../UserPlaylist/UserPlaylist";

class PlaylistList extends React.Component {
  render() {
    return (
      <div className="PlaylistList">
        {this.props.playlists &&
          this.props.playlists.map((playlist) => {
            return (
              <UserPlaylist
                playlist={playlist}
                key={playlist.id}
                // onAdd={this.props.onAdd}
                // onRemove={this.props.onRemove}
                // isRemoval={this.props.isRemoval}
              />
            );
          })}
      </div>
    );
  }
}

export default PlaylistList;
