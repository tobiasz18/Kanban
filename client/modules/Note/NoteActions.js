import uuid from 'uuid';
import callApi from '../../util/apiCaller';
import { fetchLanes } from '../Lane/LaneActions';
 
// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
// Export Actions

export function createNote(note) {
    return {
        type: CREATE_NOTE,
        note
    }
}

export function createNoteRequest(note) {
  return (dispatch) => {
    return callApi(`lanes/${note.id}/notes`, 'post', {name: note.name})
      .then(res => {
        dispatch(createNote(res))
        dispatch(fetchLanes())
      })
  }
} 

export function getNotes(notes) {
  return {
    type: CREATE_NOTES,
    notes
  }
}

export function fetchNotes(laneId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}/notes`)
      .then(res => dispatch(getNotes(res)))
  }
}

export function updateNote(updatedNote) {
    return {
        type: UPDATE_NOTE,
        ...updatedNote
    }
}

export function updateNoteRequest(laneId, noteId, updatedNote) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}/notes/${noteId}`, 'put', updatedNote)
      .then(res => {
        dispatch(updateNote(res))
        dispatch(fetchLanes())
      })
  }
}

export function deleteNote(noteId) {
    return {
        type: DELETE_NOTE,
        noteId
    }
}

export function deleteNoteRequest(laneId, noteId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}/notes/${noteId}`, 'delete')
      .then(() => {
        dispatch(deleteNote(noteId))
        dispatch(fetchLanes())
      })
  }
}