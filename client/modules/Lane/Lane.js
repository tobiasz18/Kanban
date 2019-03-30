import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Style
import styles from './Lane.css';

import Edit from '../../components/Edit';
import Notes from '../Note/Notes';
import { updateLaneRequest, deleteLaneRequest, fetchLanes } from './LaneActions';
import { createNoteRequest, fetchNotes } from '../Note/NoteActions';
class Lane extends Component {

  render() {
    const { lane,  laneNotes, ...props } = this.props;
    const laneId = lane.id
    return (
      <div {...props}>
       <div>
          <button onClick={() => {
              this.props.dispatch(createNoteRequest({name: 'New Note', id: laneId}))     
            }  
          }>
            add Note
          </button>
        </div>
        <div
          className={styles.LaneHeader}
          onClick={() => {
            this.props.dispatch(updateLaneRequest({ id: laneId, editing: true }),
            )}}
        >
        <div>     
        </div>
          <Edit 
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onEdit={bodyToChange => {
              this.props.dispatch(updateLaneRequest({id: laneId, ...bodyToChange}))  
            }}
          />
        </div>
        <div className={styleMedia.LaneDelete}>
          <button onClick={() => this.props.dispatch(deleteLaneRequest(laneId))}>Del Lane</button>
        </div>
        <Notes 
          notes={laneNotes}
          laneId={laneId}
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
