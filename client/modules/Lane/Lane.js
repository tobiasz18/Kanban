import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Style
import styles from './Lane.css';

import Edit from '../../components/Edit';
import Notes from '../Note/Notes';
import { updateLaneRequest, deleteLaneRequest, fetchLanes } from './LaneActions';
import { createNoteRequest, fetchNotes } from '../Note/NoteActions';
class Lane extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchLanes());
   // this.props.dispatch(fetchNotes(this.props.lane.id))
  }

  updateLane() {
    this.props.dispatch(fetchLanes());
    this.setState({editing: false})
  }

  updateNote() {
    this.props.dispatch(fetchNotes(this.props.lane.id))
    console.log('note update')
  }

  render() {
    const { lane,  laneNotes,  ...props } = this.props;
    const laneId = lane.id
  
    return (
      <div {...props}>
       <div>
          <button onClick={() => {
              this.props.dispatch(createNoteRequest({name: 'New Note', id: laneId})),
              this.props.dispatch(fetchLanes());
            }  
          }>
            add Note
          </button>
        </div>
        <div
          className={styles.LaneHeader}
          onClick={() => {
            this.props.dispatch(updateLaneRequest({ id: laneId, editing: true }),
            this.setState({editing: true})
            )}}
        >
        <div>     
        </div>
          <Edit 
            className={styles.LaneName}
            editing={this.state.editing}
            value={lane.name}
            onEdit={name => {
              this.props.dispatch(updateLaneRequest({id: laneId, name, editing: false})),
              this.updateLane() 
            }}
          />
        </div>
        <div className={styleMedia.LaneDelete}>
          <button onClick={() => this.props.dispatch(deleteLaneRequest(laneId))}>Del Lane</button>
        </div>
        <Notes 
          notes={laneNotes}
          laneId={laneId}
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
