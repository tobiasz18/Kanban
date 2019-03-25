import uuid from 'uuid';
import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const CREATE_LANES = 'CREATE_LANES';

// Export Actions
export function createLane(lane) {
    return {
        type: CREATE_LANE,
        lane
    };
};

export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane)
      .then(res => dispatch(createLane(res.lane)));
  };
}

export function createLanes(lanes) {
  return {
      type: CREATE_LANES,
      lanes
  }
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      dispatch(createLanes(res.lanes))
    })
  }
}

export function updateLane(updatedLane) {
    return {
        type: UPDATE_LANE,
        updatedLane
    };
};

export function updateLaneRequest(updatedLane) {
  return (dispatch) => {
    return callApi(`lanes/${updatedLane.id}`, 'put', updatedLane)
      .then(res => dispatch(updateLane(res.lane)))
  }
}

export function deleteLane(id) {
    return {
        type: DELETE_LANE,
        ...id
    }
}


