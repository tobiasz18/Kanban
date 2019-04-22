import React from 'react';
import Lane from './Lane';
import PropTypes from 'prop-types';
import styles from './Lane.css';


const Lanes = ({ lanes }) => {
  //console.log('lanes', lanes)
  return (
    <div className={styles.lanes} >
      {
        lanes.map(lane => 
          <Lane className="lane" key={lane.id} lane={lane} />
        )
      }
    </div>
  );  
};




Lanes.propTypes = {
  name: PropTypes.array
};


export default Lanes;
