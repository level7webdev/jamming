import React from 'react';
import './Track.css';

class Track extends React.Component {
    renderAction() {
        let symbol = (this.props.isRemoval ? '-' : '+');
        return <button className="Track-action">{symbol}</button>;
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>Track Name</h3>
                    <p>Artist | Album</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
};

export default Track;
