import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './Lane.css';
import Edit from '../../components/Edit';
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
          <Edit 
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onEdit={name => props.updateLane({id: laneId, name, editing: false})}
          />
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
