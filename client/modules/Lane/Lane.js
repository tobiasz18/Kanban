import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Style
import styles from './Lane.css';

import Edit from '../../components/Edit';
import NotesContainer from '../Note/NotesContainer';
import { updateLaneRequest, deleteLaneRequest, fetchLanes } from './LaneActions';
import { createNoteRequest, fetchNotes } from '../Note/NoteActions';

class Lane extends Component {

  render() {
    const { lane, notes,  laneNotes, ...props } = this.props;
    const laneId = lane.id;
    const ramdoColor = {background: lane.color}

    const noteList = []

    notes.map((note) => {
      laneNotes.map((laneNote) => {
        if(note.id === laneNote) {
          noteList.push(note)
        }
      })
    })

    return (
      <div {...props} className={styles.lane}>
        <div
          style={ramdoColor}
          className={styles.LaneHeader}
          onClick={() => {
            this.props.dispatch(updateLaneRequest({ id: laneId, editing: true }),
          )}}
        >
          <Edit 
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onEdit={bodyToChange => {
              this.props.dispatch(updateLaneRequest({id: laneId, ...bodyToChange}))  
            }}
          />
          <div className={styleMedia.LaneDelete}>
            <div className={styles.ex2} onClick={() => this.props.dispatch(deleteLaneRequest(laneId))}></div>
          </div>       
        </div>
        <div className={styles.AddNote} onClick={() => {
            this.props.dispatch(createNoteRequest({name: 'New Note', id: laneId}))     
          }}  >
        <div className={styles.cross}></div> 
        </div>
      
        <NotesContainer  
          notes={noteList}
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
