import React  from 'react';
import PropTypes from 'prop-types';

import styles from './Note.css';

import {DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import {compose} from 'redux';
import { updateLaneRequest } from '../Lane/LaneActions';
import { connect } from 'react-redux';

class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging, onMove, id, editing, ...props} = this.props;
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget( 
      <li style={{
        opacity: isDragging ? 0 : 1
      }} className={styles.Note} {...props}>{props.children}</li>
    ))
  }
}  

Note.propTypes = {
  children: PropTypes.any
};

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.children.props.value,
      laneId: props.laneId
    };
  },
  isDragging(props, monitor) {
    // props.id === monitor.getItem().id
    return false
  }
}

const noteTarget = {
  canDrop (targetProps, monitor) {
    const sourceProps =  monitor.getItem();

    function takeIndex(indeks) {
      let myIndex;
      targetProps.allNotes.forEach((obj, index) => {
        if(obj.id == indeks) {
          myIndex = index
        }    
      })
      return myIndex
    }
    // swapping places in the array
    function move(array, oldIndex, newIndex) {
        if (newIndex >= array.length) {
            newIndex = array.length - 1;
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        return array;
    }

    const newNotesArray = move(targetProps.allNotes, takeIndex(sourceProps.id), takeIndex(targetProps.id))

    if(targetProps.id !== sourceProps.id) {
      targetProps.dispatch(updateLaneRequest({id: targetProps.laneId, notes: newNotesArray}))
    }
  }
}

export default compose(
  connect(null),
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  })),

)(Note)
 