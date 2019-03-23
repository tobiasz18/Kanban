import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';

import { createLane } from '../Lane/LaneActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('../App/components/DevTools').default;
}

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: true };
  }

  render() {
    const { lanes, createLane } = this.props;
    console.log(this.props, process.env.NODE_ENV)
    return (
      <div>
        {this.state.isMounted && process.env.NODE_ENV === 'development' && <DevTools />}
    
        <button 
          className={styles.AddLane}
          onClick={() => createLane({
            name: 'New Lane'
          })}
        >Add lane</button>
       {/*<Lanes lanes={lanes} />*/ }
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