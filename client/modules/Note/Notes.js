import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';

const Notes = ({ notes }) => {
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
          value={note.task}
          onValueClick={() => onValueClick(note.id)}
          onEdit={() => onEdit(note.id)}
          onDelete={() => onDelete(note.id)}
        />
        </Note>
      )}
    </ul>
  );
};

Notes.propTypes = {
  notes: PropTypes.array
};

export default Notes;