/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import lane from './modules/Lane/LaneReducer';
import note from './modules/Note/NoteReducer';
// Combine all reducers into one root reducer
export default combineReducers({
 /* app,
  posts,
  intl,*/
  lane,
  note
});
