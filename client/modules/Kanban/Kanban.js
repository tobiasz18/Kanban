import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
import Helmet from 'react-helmet';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('../App/components/DevTools').default;
}
class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isMounted: true, 
      show: true // show add lane button or input add lane
    };
   
  }

  componentDidMount() {
    this.props.dispatch(fetchLanes());
  }

  handleChange(e) {
    const value = e.target.value.trim();
    if(e.key === 'Enter' && value !== "" ){
      this.props.dispatch(createLaneRequest({
        name: value
      })) 
      this.setState({show: true})
    } 
  }

  finishChanging() {
    this.setState({show: true})
  }

  changeStateToFalse() {
    if(this.props.lanes.length >= 5) alert('The maximum number of columns is 5')
    this.setState({show: false})
  }

  render() {
    const { lanes } = this.props;

    return (
      <div className={styles.container}>
        <Helmet
          title="Kanban board"
          titleTemplate="%s - Kanban board"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        {this.state.isMounted && process.env.NODE_ENV === 'development' && <DevTools />}   
        {
          this.state.show ?  // Render Input or Add lane title 
            <div className={styles.addLaneContainer} onClick={() => this.changeStateToFalse()}>
              <button className={styles.AddLane}>Add lane</button>       
              <div className={styles.cross}></div> 
            </div>  
            :  
            <input 
              className={styles.input} 
              type="text" 
              placeholder="Add lane" 
              autoFocus={true} 
              onBlur={() => this.finishChanging()}  
              onKeyPress={(e) => this.handleChange(e)}
            />
        }     
        <Lanes lanes={lanes} />
      </div>
    );
  }  
}

//Lanes.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
  lanes: Object.values(state.lane)
});


export default connect(mapStateToProps)(Kanban);