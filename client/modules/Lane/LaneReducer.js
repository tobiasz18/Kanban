// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE } from './LaneActions';

// Initial State
const initialState = [];

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LANE:
      return [...state, action.lane];

    case UPDATE_LANE:
      return state.map((lane) => {
        if(lane.id === action.id) {
          return Object.assign({}, lane, action.updatedLane)
        }
        return lane;
      })

    case DELETE_LANE:
      return state.fiter((lane) => lane.id !== action.id)  
    default:
      return state;
  }
};  

                
export default LaneReducer;