import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';

import { createLane } from '../Lane/LaneActions';

class Kanban extends Component {
  render() {
    const { lanes, createLane } = this.props;

    return (
      <div>
        <button 
          className={styles.AddLane}
          onClick={() => createLane({
            name: 'New Lane'
          })}
        >Add lane</button>
        <Lanes lanes={lanes} />    
      </div>
    );
  }  
}

const mapStateToProps = state => ({
  lanes: state.lanes
});

const mapDispatchToProps = {
  createLane
}

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);