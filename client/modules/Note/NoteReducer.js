// Import Actions
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_NOTES } from './NoteActions';

// Initial State
const initialState = [];

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return [...state, action.note]   
      
    case CREATE_NOTES:
      return [action.notes]    

    case UPDATE_NOTE: 
      return state.map((note) => note.id === action.id ? { ...note, ...action.note } : note );  

    case DELETE_NOTE:
      return state.filter(note => note.noteId !== action.noteId)
      
    default:
      return state;
  }
};

export default NoteReducer;
