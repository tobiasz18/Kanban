import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './Lane.css';

class Lane extends Component {
  render() {
    const { lane, laneNotes, ...props } = this.props;
    const laneId = lane.id

    return (
      <div {...props}>
        <div
          className={styles.LaneHeader}
          onClick={() => props.updateLane({ id: laneId, editing: true })}
        >
          <div>
            <button onClick={props.addNote.bind(this. laneId)}>+</button>
          </div>
          <h4>{lane.name}</h4>
          <div className={styleMedia.LaneDelete}>
            <button onClick={this.props.LaneDelete.bind(this, lane)}>x</button>
          </div>
        </div>
        <NotesContainer 
          notes={laneNotes}
        />
      </div>
    );
  }
}

Lane.propsTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array
}

export default Lane;
