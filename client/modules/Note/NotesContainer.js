import { connect } from 'react-redux';
import Notes from './Notes';


const mapStateToProps = (state, ownProps) => {
  return {
    NoteState: Object.values(state.note)
  };
};



export default connect(mapStateToProps)(Notes);