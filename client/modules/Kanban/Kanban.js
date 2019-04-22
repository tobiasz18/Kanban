import React, { Component } from 'react';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
import Helmet from 'react-helmet';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { compose } from 'redux';

import { connect } from 'react-redux'

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('../App/components/DevTools').default;
}
class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isMounted: false, 
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
    if(this.props.lanes.length >= 4) alert('The maximum number of columns is 4')
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
            <textarea 
              className={styles.input} 
              rows="4"
              cols="35"
              maxlength="89"
              type="text" 
              placeholder="Name" 
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

export default compose(
  connect(mapStateToProps),
  DragDropContext(HTML5Backend)
)(Kanban)



