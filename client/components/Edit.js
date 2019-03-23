import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Edit extends Component {
  render() {
    const {editing, ...props} = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }

  renderEdit = () => {//3
    return <input 
              type="text"
              autoFocus={true}
              defaultValue={this.props.value}
              onBlur={this.finishEdit}
              onKeyPress={this.checkEnter}
            />;
  };

  renderValue = () => { //1
    const { value, onDelete, onValueClick } = this.props;

    return (
      <div onClick={onValueClick}>
        <span className={styles.value}>{value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };

  renderDelete = (e) => {//2
    return <button className={styles.delete} onClick={this.props.onDelete}>x</button>
  };

  checkEnter = (e) => { //5
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {//4
    const value = e.target.value;
    
    if(this.props.onEdit) {
      this.props.onEdit(value.trim());
    }
  };
}

Edit.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onValueClick: PropTypes.func,
  editing: PropTypes.bool
};

