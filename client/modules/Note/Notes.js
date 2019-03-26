import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';
import { deleteNoteRequest, updateNoteRequest } from './NoteActions';
import { fetchLanes } from '../Lane/LaneActions';


const Notes = ({ notes,laneId, dispatch }) => {
  console.log(notes, 'asdsa')
  return (
    <ul className="notes">
      {notes.map((note) => 
        <Note 
          id={note.id} 
          key={note.id}
          editing={note.editing}
        >
        <Edit 
          editing={note.editing}
          value={note.name}
          onValueClick={() => {
            dispatch(updateNoteRequest(laneId, note.id, {editing: true})),
            dispatch(fetchLanes())
          }}
          onEdit={(updateNote) => {
            dispatch(updateNoteRequest(laneId, note.id, updateNote)),
            dispatch(fetchLanes())
          }}
          onDelete={() =>{
            dispatch(deleteNoteRequest(laneId, note.id)),
            dispatch(fetchLanes())
            console.log('delete request')
          } }
        />
        </Note>
      )}
    </ul>
  );
};

Notes.propTypes = {
  notes: PropTypes.array
};


export default connect(null)(Notes)