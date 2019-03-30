import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

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

  componentDidMount() {
    this.props.dispatch(fetchLanes());
  }

  render() {
    const { lanes } = this.props;

    return (
      <div className={styles.container}>
        {this.state.isMounted && process.env.NODE_ENV === 'development' && <DevTools />}
    
        <button 
          className={styles.AddLane}
          onClick={() => this.props.dispatch(createLaneRequest({
            name: 'New Lane'
          }))}
        >Add lane</button>
       <Lanes lanes={lanes} />
      </div>
    );
  }  
}

const mapStateToProps = state => ({
  lanes: state.lane
});


export default connect(mapStateToProps)(Kanban);