
import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const CREATE_LANES = 'CREATE_LANES';

import { normalize, schema } from 'normalizr';
import { lanesSchema } from '../../util/schema'
import { createNotes } from '../Note/NoteActions';

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
      const normalizedData = normalize(res.lanes, lanesSchema);
      const {lanes, notes} = normalizedData.entities;
      dispatch(createLanes(lanes))
      dispatch(createNotes(notes))
    })
  }
}

export function updateLane(lane) {
    return {
        type: UPDATE_LANE,
        lane
    };
};

export function updateLaneRequest(laneObject) {
  return (dispatch) => {
    return callApi(`lanes/${laneObject.id}`, 'put', laneObject)
      .then(res => {
        dispatch(updateLane(res.lane))
        dispatch(fetchLanes())
      })
  }
}

export function deleteLane(id) {
    return {
        type: DELETE_LANE,
        id
    }
}

export function deleteLaneRequest(cuid) {
  return (dispatch) => {
    return callApi(`lanes/${cuid}`, 'delete').then(() => dispatch(deleteLane(cuid)));
  };
}
