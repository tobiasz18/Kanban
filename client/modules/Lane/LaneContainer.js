import { connect } from 'react-redux';
import Lane from './Lane';


const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes,
    lanetest: state
  };
};


export default connect(mapStateToProps)(Lane);