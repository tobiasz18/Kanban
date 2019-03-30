// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, CREATE_LANES } from './LaneActions';

// Initial State
const initialState = [];

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LANE:
      return [...state, action.lane];

    case CREATE_LANES:
      return [...action.lanes]

    case UPDATE_LANE: 
      return state.map((lane) => lane.id === action.id ? [...lane, action.updatedLane] : lane)  

    case DELETE_LANE:
      return state.filter((lane) => lane.id !== action.id)  

    default:
      return state;
  }
};  

                
export default LaneReducer;