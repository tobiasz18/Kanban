import React from 'react';
import LaneContainer from './LaneContainer';
import PropTypes from 'prop-types';
import styles from './Lane.css';

const Lanes = ({ lanes }) => {
  return (
    <div className={styles.lanes}>
      {
        lanes.map(lane => 
          <LaneContainer className="lane" key={lane.id} lane={lane} />
        )
      }
    </div>
  );  
};

Lanes.propTypes = {
  name: PropTypes.array
};

export default Lanes;
