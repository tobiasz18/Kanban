import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Style
import styles from './Lane.css';

import Edit from '../../components/Edit';
import NotesContainer from '../Note/NotesContainer';
import { updateLaneRequest, deleteLaneRequest } from './LaneActions';
import { createNoteRequest, deleteNoteRequest } from '../Note/NoteActions';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import { attachToLaneRequest } from '../DndActions/actions';
class Lane extends Component {

  render() {
    const { connectDropTarget, lane, notes,  laneNotes, ...props } = this.props;
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
   // console.log(laneNotes, noteList)
    return connectDropTarget(
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
          currentLane={lane}
        />
      </div>
    );
  }
}

Lane.propsTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes,
    notes: Object.values(state.note)
  };
};

const noteTarget = {
  drop (targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(targetProps.lane.id !== sourceProps.laneId) {
      targetProps.dispatch(deleteNoteRequest(targetProps.lane.id, sourceProps.id))
      targetProps.dispatch(attachToLaneRequest(
        targetProps.lane.id,
        sourceProps.name
      ))  
    }
  } 
}

export default compose(
  connect(mapStateToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane)

