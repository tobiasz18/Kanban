import uuid from 'uuid';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const CREATE_LANES = 'CREATE_LANES';

// Export Actions
export function createLane(lane) {
    return {
        type: CREATE_LANE,
        lane: {
            id: uuid.v4(),
            notes: lane.notes || [],
            ...lane
        }
    };
};

export function updateLane(updatedLane) {
    return {
        type: UPDATE_LANE,
        ...updatedLane
    };
};

export function deleteLane(id) {
    return {
        type: DELETE_LANE,
        id
    }
}

export function createLanes(lanes) {
    return {
        type: CREATE_LANES,
        lanes
    }
}
