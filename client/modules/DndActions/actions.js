export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';

import callApi from '../../util/apiCaller';

import { fetchLanes } from '../Lane/LaneActions';

export function attachToLane(note) {
  return {
    type: ATTACH_TO_LANE,
    note
  }
}

export function attachToLaneRequest(id, nameNote) {
  return (dispatch) => {
    return callApi(`lanes/${id}/notes`, 'post', {name: nameNote})
    .then(res => {
      dispatch(attachToLane(res))
      dispatch(fetchLanes())
      })
  }
}
