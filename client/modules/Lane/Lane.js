import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Style
import styles from './Lane.css';

import Edit from '../../components/Edit';
import Notes from '../Note/Notes';
import { updateLaneRequest, deleteLane } from './LaneActions';
import { createNote } from '../Note/NoteActions';
class Lane extends Component {
  render() {
    const { lane,  laneNotes,  ...props } = this.props;
    const laneId = lane.id
    console.log(this.props, 'lane')
    return (
      <div {...props}>

       <div>
          <button onClick={() => this.props.dispatch(createNote({name: 'New Note', id: laneId}))}>
            add Note
          </button>
        </div>

        <div
          className={styles.LaneHeader}
          onClick={() => this.props.dispatch(updateLaneRequest({ id: laneId, editing: true }))}
        >
        <div>
         
        </div>
          <Edit 
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onEdit={name => this.props.dispatch(updateLaneRequest({id: laneId, name, editing: false}))}
          />
        </div>

        <div className={styleMedia.LaneDelete}>
          <button onClick={() => this.props.dispatch(deleteLane({id: laneId}))}>Del Lane</button>
        </div>

        <Notes 
          notes={laneNotes}
        />
      </div>
    );
  }
}

Lane.propsTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array
}

export default Lane;
