import React, {Component} from 'react';
import './Photos.css';
import ImgContainer from './ImgContainer';
var arrayMove = require('array-move');

class Photos extends Component {
  state = {
    photos: this.props.photos,
    refresh: false
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    if (oldIndex !== newIndex) {
      this.props.enableButton();
    }
    this.setState({
      photos: arrayMove(this.state.photos, oldIndex, newIndex)
    });
  };

  render() {
    return (
      <div className="photos-grid">
        <ImgContainer
          photos={this.state.photos}
          onSortEnd={this.onSortEnd}
          pressDelay={100}
          axis="xy"
        />
      </div>
    );
  }
}

export default Photos;
