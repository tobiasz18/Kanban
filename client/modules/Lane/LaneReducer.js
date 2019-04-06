// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, CREATE_LANES } from './LaneActions';

import _ from 'lodash';

// Initial State
const initialState = {};

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LANE:
      return {...state, [action.lane.id] : action.lane}

    case UPDATE_LANE: 
       return {...state, [action.lane.id] : action.lane}

    case CREATE_LANES:
      return {...action.lanes}

   

    case DELETE_LANE:
      return _.omit(state, action.id)

    default:
      return state;
  }
};  

                
export default LaneReducer;