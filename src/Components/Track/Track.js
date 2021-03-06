import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    const trackName = this.props.track.name;
    const albumName = this.props.track.album;
    const artistName = this.props.track.artist;

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{trackName}</h3>
          <p>
            {artistName} | {albumName}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
