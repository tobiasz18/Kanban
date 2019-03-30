import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Edit.css'
//import {fetchLanes} from '../modules/Lane/LaneActions';
export default class Edit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  render() {
    const {editing, ...props} = this.props;
    console.log(editing)
    return (
      <div {...props}>
        {editing? this.renderEdit() : this.renderValue()}
      </div>
    );
  }

  renderEdit = () => {
    return <input 
              type="text"
              autoFocus={true}
              defaultValue={this.props.value}
              onBlur={this.finishEdit}
              onKeyPress={this.checkEnter}
            />;
  };

  renderValue = () => { 
    const { value, onDelete, onValueClick } = this.props;
    return (
      <div>
        <span onClick={onValueClick} className={styles.value}>{value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };

  renderDelete = () => {
    return <button className={styles.delete} onClick={this.props.onDelete}>x</button>
  };

  checkEnter = (e) => { 
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    const value = e.target.value.trim();
 
    if(this.props.onEdit) {
      this.props.onEdit({name: value, editing: false});
    }   
  };
}

Edit.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onValueClick: PropTypes.func,
  editing: PropTypes.boolean
};

