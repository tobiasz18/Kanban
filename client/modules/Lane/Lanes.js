import React from 'react';
import Lane from './Lane.js';
import PropTypes from 'prop-types';

const Lanes = ({ lanes }) => {
  return (
    <div className="lanes">
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
