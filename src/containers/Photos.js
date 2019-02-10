import React, {Component} from 'react';
import './Photos.css';
import ImgContainer from './ImgContainer';
var arrayMove = require('array-move');

class Photos extends Component {
  state = {
    photos: this.props.photos,
    refresh: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      photos: nextProps.photos
    });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    if (oldIndex !== newIndex) {
      this.props.enableButton();
    }
    const photos = arrayMove(this.state.photos, oldIndex, newIndex);
    this.setState({ photos });
    this.props.updatePhotos(photos);
  };

  render() {
    return (
      <div className="photos-grid">
        <ImgContainer
          photos={this.state.photos}
          getPhoto={this.props.getPhoto}
          onSortEnd={this.onSortEnd}
          pressDelay={100}
          axis="xy"
        />
      </div>
    );
  }
}

export default Photos;
