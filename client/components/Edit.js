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
    const {editing,noteList, ...props} = this.props;

    return (
      <div {...props} className = {styles.containerValue}>  {noteList ? `(${noteList})` : ''}
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }

  renderEdit = () => {
    console.log('hellow from edit', this.props);
    const max = this.props.maxLength ? this.props.maxLength : 570
    const maxRows = this.props.maxRows ? this.props.maxRows : 12
    return <textarea  
              style={{padding: "5px", overflow: 'auto'}}
              type="text"
              cols="30" 
              rows={`${maxRows}`}
              maxLength= {`${max}`}
              className= {styles.Edit_Inut} 
              autoFocus={true}
              defaultValue={this.props.value}
              onBlur={this.finishEdit}
              onKeyPress={this.checkEnter}
            />;
  };

  renderValue = () => { 
    const { value, onDelete, onValueClick } = this.props;

    return (
      <div onClick={onValueClick} style={{paddingBottom: "30px"}}>
        <span  className={styles.NoteValue}>{value}</span>
        {onDelete ? this.renderDelete() : null }
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

