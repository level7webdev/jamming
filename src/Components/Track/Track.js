import React from 'react';
import './Track.css';

class Track extends React.Component {
    renderAction() {
        let symbol = (this.props.isRemoval ? '-' : '+');
        return <button className="Track-action">{symbol}</button>;
    }
    
    render() {
        const trackName = this.props.track.name;
        const albumName = this.props.track.album;
        const artistName = this.props.track.artist;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{trackName}</h3>
                    <p>{artistName} | {albumName}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
};

export default Track;
